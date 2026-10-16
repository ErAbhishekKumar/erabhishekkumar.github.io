(function () {
    if (window.cordova) {
        return;
    }

    const groupScript = [...document.scripts].find((script) => /1st_g[123]\.js(?:[?#]|$)/.test(script.src));
    const groupId = groupScript?.src.match(/1st_g[123]/)?.[0];
    const groupData = groupId ? window.firstSemesterGroups?.[groupId] : null;
    const syllabusData = groupData?.courses;
    let buttons = [];
    const content = document.getElementById('syllabus-content');
    const creditsToggle = document.getElementById('credits-toggle');
    const creditsTable = document.getElementById('credits-table-container');
    const filterControls = document.getElementById('filter-controls');

    if (!groupData || !syllabusData || !content || !filterControls) {
        console.error('First-semester web syllabus could not initialize: group data or page elements are missing.');
        return;
    }

    function renderCreditsTable() {
        const tbody = creditsTable?.querySelector('tbody');
        if (!tbody) {
            console.error('First-semester credit table could not initialize: table body is missing.');
            return false;
        }

        const rows = groupData.credits.map((course) => {
            const row = document.createElement('tr');
            row.className = course.id.endsWith('P') ? 'lab-row' : 'theory-row';

            const title = document.createElement('td');
            title.textContent = `${course.title} [${course.id}]`;
            row.append(title);

            [...course.hours, course.credits].forEach((value, index) => {
                const cell = document.createElement('td');
                if (index === 3) {
                    const strong = document.createElement('strong');
                    strong.textContent = String(value);
                    cell.append(strong);
                } else {
                    cell.textContent = String(value);
                }
                row.append(cell);
            });

            return row;
        });

        const totalRow = document.createElement('tr');
        totalRow.className = 'total-row';
        const totalLabel = document.createElement('td');
        const totalStrong = document.createElement('strong');
        totalStrong.textContent = 'TOTAL';
        totalLabel.append(totalStrong);
        totalRow.append(totalLabel);

        const spacer = document.createElement('td');
        spacer.colSpan = 3;
        totalRow.append(spacer);

        const totalCell = document.createElement('td');
        const totalValue = document.createElement('strong');
        totalValue.textContent = String(groupData.credits.reduce((sum, course) => sum + course.credits, 0));
        totalCell.append(totalValue);
        totalRow.append(totalCell);
        rows.push(totalRow);
        tbody.replaceChildren(...rows);
        return true;
    }

    function renderSubjectTabs() {
        const tabContainers = [...filterControls.querySelectorAll('.syllabus-tabs')];
        if (tabContainers.length < 2) {
            console.error('First-semester subject tabs could not initialize: theory or lab tab container is missing.');
            return false;
        }

        const theoryTabs = [];
        const labTabs = [];
        groupData.credits.forEach((course) => {
            const button = document.createElement('button');
            button.className = 'tab-btn';
            button.dataset.target = `subject-${course.id}`;
            button.dataset.type = course.id.endsWith('P') ? 'lab' : 'theory';
            button.textContent = course.title;
            (course.id.endsWith('P') ? labTabs : theoryTabs).push(button);
        });

        tabContainers[0].replaceChildren(...theoryTabs);
        tabContainers[1].replaceChildren(...labTabs);
        buttons = [...filterControls.querySelectorAll('.tab-btn[data-target]')];
        return buttons.length === groupData.credits.length;
    }

    if (!renderCreditsTable() || !renderSubjectTabs()) {
        console.error(`First-semester ${groupData.name} data does not match the page structure.`);
        return;
    }

    function appendOutcomeDetails(parent, label, outcomes) {
        const details = document.createElement('details');
        details.className = 'outcomes-details';

        const summary = document.createElement('summary');
        summary.textContent = label;
        details.append(summary);

        if (outcomes && outcomes.length) {
            const list = document.createElement('ul');
            list.className = 'outcomes-list';
            outcomes.forEach((outcome) => {
                const item = document.createElement('li');
                item.textContent = outcome;
                list.append(item);
            });
            details.append(list);
        } else {
            const message = document.createElement('p');
            message.className = 'outcomes-unavailable';
            message.textContent = 'Outcome details are not included in this offline copy.';
            details.append(message);
        }

        parent.append(details);
    }

    function appendCourseOutcomes(parent, outcomes) {
        if (!outcomes?.length) {
            return;
        }

        appendOutcomeDetails(parent, 'Course Outcomes (COs)', outcomes.map((outcome, index) => `CO${index + 1}. ${outcome}`));
    }

    function appendReferenceBooks(parent, references) {
        if (!references?.length) {
            return;
        }

        const heading = document.createElement('h3');
        heading.className = 'sub-heading';
        heading.textContent = 'Text/Reference Books';
        parent.append(heading);

        const list = document.createElement('ol');
        list.className = 'reference-list';
        references.forEach((reference) => {
            const item = document.createElement('li');
            item.textContent = reference;
            list.append(item);
        });
        parent.append(list);
    }

    function appendCourseContent(card, course) {
        const body = document.createElement('div');
        const unitList = document.createElement('ul');
        unitList.className = 'subject-units';
        body.append(unitList);

        const courseOutcomes = course.outcomes || {};
        let unitItem;
        let unitTitle = '';
        let unitIndex = 0;
        let topics;
        let references;
        let pendingReference = false;

        course.content.forEach((line) => {
            if (/^[\u2022\u25cf\u25e6\u25aa\u00b7\s]+$/.test(line)) {
                return;
            }

            if (/^Unit\s+\d/.test(line)) {
                unitTitle = line;
                unitIndex += 1;
                unitItem = document.createElement('li');
                unitItem.className = 'course-unit';

                const heading = document.createElement('h3');
                heading.className = 'unit-title';
                heading.textContent = line;
                unitItem.append(heading);

                const unitOutcomes = courseOutcomes[unitTitle] || courseOutcomes[unitIndex] || [];
                appendOutcomeDetails(unitItem, 'Theory Session Outcomes (TSOs)', unitOutcomes);

                topics = document.createElement('ul');
                topics.className = 'unit-topics';
                unitItem.append(topics);
                unitList.append(unitItem);

                references = null;
                pendingReference = false;
                return;
            }

            if (/^Theory Session Outcomes/.test(line)) {
                if (!unitItem) {
                    const sectionOutcomes = courseOutcomes[unitIndex + 1] || [];
                    appendOutcomeDetails(body, 'Theory Session Outcomes (TSOs)', sectionOutcomes);
                }
                references = null;
                return;
            }

            if (/^Practical\/Lab Session Outcomes/.test(line)) {
                appendOutcomeDetails(body, line, courseOutcomes.practical || []);
                topics = document.createElement('ul');
                topics.className = 'unit-topics';
                unitList.append(topics);
                references = null;
                return;
            }

            if (line === 'List of Experiments' || /^Perform any \d+ Experiments$/i.test(line)) {
                const heading = document.createElement('h3');
                heading.className = 'sub-heading';
                heading.textContent = line;
                body.append(heading);
                topics = document.createElement('ul');
                topics.className = 'unit-topics';
                unitList.append(topics);
                references = null;
                return;
            }

            if (/^Text\/Reference Books$/i.test(line)) {
                const heading = document.createElement('h3');
                heading.className = 'sub-heading';
                heading.textContent = line;
                body.append(heading);
                references = document.createElement('ol');
                references.className = 'reference-list';
                body.append(references);
                topics = null;
                unitItem = null;
                pendingReference = false;
                return;
            }

            if (/^LE[-\s]*\d+/i.test(line)) {
                if (!topics) {
                    topics = document.createElement('ul');
                    topics.className = 'unit-topics';
                    unitList.append(topics);
                }
                const item = document.createElement('li');
                item.textContent = line;
                topics.append(item);
                return;
            }

            if (references && /^\d+\.$/.test(line)) {
                pendingReference = true;
                return;
            }

            if (references && pendingReference) {
                const item = document.createElement('li');
                item.textContent = line;
                references.append(item);
                pendingReference = false;
                return;
            }

            if (topics) {
                const item = document.createElement('li');
                item.textContent = line;
                topics.append(item);
                return;
            }

            if (references && references.lastElementChild) {
                references.lastElementChild.textContent += ` ${line}`;
                return;
            }

            const paragraph = document.createElement('p');
            paragraph.textContent = line;
            body.append(paragraph);
        });

        card.append(body);
        appendReferenceBooks(card, course.references);
    }

    function topicTextWithoutActions(topic) {
        const clone = topic.cloneNode(true);
        clone.querySelector('.topic-actions-container')?.remove();
        return clone.innerText.trim();
    }

    function topicCompletionKey(topic) {
        if (typeof window.getTopicId === 'function') {
            return window.getTopicId(topic);
        }
        return `first-semester_completed_${topic.closest('.subject-card')?.querySelector('h2')?.innerText.trim()}_${topicTextWithoutActions(topic)}`;
    }

    function updateCompletionState(topic, completed) {
        const button = topic.querySelector('.mark-complete-button');
        const label = button?.querySelector('.mark-complete-text');
        topic.classList.toggle('topic-completed', completed);
        if (label) {
            label.textContent = completed ? 'Done' : 'Mark as Done';
        }
    }

    function addTopicActionControls() {
        content.querySelectorAll('.unit-topics > li').forEach((topic) => {
            if (topic.querySelector('.topic-actions-container')) {
                return;
            }

            const actions = document.createElement('div');
            actions.className = 'topic-actions-container';

            const askButton = document.createElement('button');
            askButton.type = 'button';
            askButton.className = 'ask-ai-topic-button';
            askButton.dataset.topicAction = 'ask-ai';
            askButton.title = 'Ask AI about this topic';
            askButton.append('Ask ');
            const aiLabel = document.createElement('span');
            aiLabel.className = 'ai-text';
            aiLabel.textContent = 'AI';
            askButton.append(aiLabel);
            actions.append(askButton);

            const topicText = topicTextWithoutActions(topic);
            const subjectTitle = cardTitle(topic);
            const youtubeLink = document.createElement('a');
            youtubeLink.className = 'search-youtube-button';
            youtubeLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${topicText} ${subjectTitle}`.trim())}`;
            youtubeLink.target = '_blank';
            youtubeLink.rel = 'noopener noreferrer';
            youtubeLink.title = 'Search this topic on YouTube';
            youtubeLink.textContent = 'YouTube';
            actions.append(youtubeLink);

            const doneButton = document.createElement('button');
            doneButton.type = 'button';
            doneButton.className = 'mark-complete-button';
            doneButton.dataset.topicAction = 'mark-done';
            doneButton.title = 'Toggle completion status';
            const doneLabel = document.createElement('span');
            doneLabel.className = 'mark-complete-text';
            doneLabel.textContent = 'Mark as Done';
            doneButton.append(doneLabel);
            actions.append(doneButton);

            topic.append(actions);
            const key = topicCompletionKey(topic);
            if (key) {
                updateCompletionState(topic, localStorage.getItem(key) === 'true');
            }
        });
    }

    function cardTitle(topic) {
        return topic.closest('.subject-card')?.querySelector('h2')?.innerText.trim() || '';
    }

    function unitTitle(topic) {
        return topic.closest('.course-unit')?.querySelector('.unit-title')?.innerText.trim() || '';
    }

    async function askAiAboutTopic(topic) {
        const subject = cardTitle(topic);
        const unit = unitTitle(topic);
        let prompt = `Explain this in detail: ${topicTextWithoutActions(topic)}`;
        if (unit) {
            prompt += ` from the chapter '${unit}'`;
        }
        if (subject) {
            prompt += ` from the subject '${subject}'`;
        }

        if (typeof navigator.share === 'function') {
            try {
                await navigator.share({ text: prompt });
                return;
            } catch (error) {
                if (error.name === 'AbortError') {
                    return;
                }
                console.error('Could not open the share sheet for the AI prompt.', error);
            }
        }

        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(prompt);
                window.alert('Prompt copied to clipboard!');
                return;
            } catch (error) {
                console.error('Could not copy the AI prompt to the clipboard.', error);
            }
        }

        window.prompt('Copy this prompt into your AI assistant:', prompt);
    }

    content.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-topic-action]');
        if (!button || !content.contains(button)) {
            return;
        }

        event.stopPropagation();
        const topic = button.closest('.unit-topics > li');
        if (!topic) {
            return;
        }

        if (button.dataset.topicAction === 'mark-done') {
            const key = topicCompletionKey(topic);
            const completed = !topic.classList.contains('topic-completed');
            updateCompletionState(topic, completed);
            if (key) {
                if (completed) {
                    localStorage.setItem(key, 'true');
                } else {
                    localStorage.removeItem(key);
                }
            }
            return;
        }

        if (button.dataset.topicAction === 'ask-ai') {
            askAiAboutTopic(topic);
        }
    });

    function createSubjectCard(button) {
        const subjectId = button.dataset.target.replace(/^subject-/, '');
        const course = syllabusData[subjectId];
        const card = document.createElement('section');
        card.className = `info-card subject-card ${button.dataset.type === 'lab' ? 'lab-card' : 'theory-card'}`;

        const heading = document.createElement('h2');
        heading.className = button.dataset.type === 'lab' ? 'lab-heading' : 'theory-heading';
        heading.textContent = button.textContent.trim();
        card.append(heading);

        if (!course || !course.content?.length) {
            const message = document.createElement('p');
            message.textContent = `Syllabus content is unavailable for subject ${subjectId}.`;
            card.append(message);
        } else {
            appendCourseOutcomes(card, course.courseOutcomes);
            appendCourseContent(card, course);
        }

        return card;
    }

    function renderSubject(button) {
        buttons.forEach((item) => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.classList.toggle('theory-active', active && item.dataset.type === 'theory');
            item.classList.toggle('lab-active', active && item.dataset.type === 'lab');
            item.setAttribute('aria-pressed', String(active));
        });

        content.replaceChildren(createSubjectCard(button));
        addTopicActionControls();
    }

    let printContentSnapshot = null;
    window.addEventListener('beforeprint', () => {
        if (printContentSnapshot) {
            return;
        }

        printContentSnapshot = [...content.childNodes];
        content.replaceChildren(...buttons.map(createSubjectCard));
    });

    window.addEventListener('afterprint', () => {
        if (!printContentSnapshot) {
            return;
        }

        content.replaceChildren(...printContentSnapshot);
        printContentSnapshot = null;
    });

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.tab-btn[data-target]');
        if (button && buttons.includes(button)) {
            renderSubject(button);
        }
    });

    if (creditsToggle && creditsTable) {
        creditsTable.classList.add('expanded');
        creditsToggle.classList.add('active');
        creditsToggle.setAttribute('role', 'button');
        creditsToggle.setAttribute('tabindex', '0');
        creditsToggle.setAttribute('aria-expanded', 'true');

        const toggleCredits = () => {
            const expanded = creditsTable.classList.toggle('expanded');
            creditsToggle.classList.toggle('active', expanded);
            creditsToggle.setAttribute('aria-expanded', String(expanded));
        };

        creditsToggle.addEventListener('click', toggleCredits);
        creditsToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleCredits();
            }
        });
    }

    const firstTheorySubject = buttons.find((button) => button.dataset.type === 'theory');
    if (firstTheorySubject) {
        window.setTimeout(() => renderSubject(firstTheorySubject), 150);
    }
})();
