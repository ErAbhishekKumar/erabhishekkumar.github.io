(function () {
    if (window.cordova) {
        return;
    }

    window.firstSemesterWebOutcomes = window.firstSemesterWebOutcomes || {};
    window.firstSemesterWebOutcomes['100101'] = {
        1: [
            'TSO 1a. Structure sentences by selecting appropriate vocabulary.',
            'TSO 1b. Assess the nature of word formation',
            'TSO 1c. Create new words with prefixes and suffixes ensuring root words',
            'TSO 1d. Use expressions in English.',
            'TSO 1e. Distinguish abbreviations and acronyms for clarity and appropriateness in formal and informal communication'
        ],
        2: [
            'TSO 2a. Use the concept of the fundamental Grammar and its uses in communication.',
            'TSO 2b. Apply articles and prepositions to construct correct sentences.',
            'TSO 2c. Develop complex sentences',
            'TSO 2d. Apply tense and voice for correct sentences',
            'TSO 2e. Distinguish redundancies and clichés to avoid unnecessary repetition.'
        ],
        3: [
            'TSO 3a. Apply analytical and persuasive writing techniques',
            'TSO 3b. Record accurate proceedings, decisions and action points',
            'TSO 3c. Incorporate the purpose of internal communication',
            'TSO 3d. Prepare a professional resume/CV highlighting skills and experience',
            'TSO 3e. Develop the ability to write coherent and well-structured essays'
        ],
        4: [
            'TSO 4a. Apply analytical and persuasive writing techniques',
            'TSO 4b. Record accurate proceedings, decisions and action points',
            'TSO 4c. Develop internal communication process in an organisation',
            'TSO 4d. Prepare a professional resume',
            'TSO 4e. Write coherent and well-structured essays'
        ],
        5: [
            'TSO 5a. Explain the literary text',
            'TSO 5b. Illustrate central ideas and messages',
            'TSO 5c. Interpret the text effectively',
            'TSO 5d. Illustrate unfamiliar texts effectively'
        ]
    };

    const syllabusData = window.firstSemesterWebData;
    const buttons = [...document.querySelectorAll('.tab-btn[data-target]')];
    const content = document.getElementById('syllabus-content');
    const creditsToggle = document.getElementById('credits-toggle');
    const creditsTable = document.getElementById('credits-table-container');

    if (!syllabusData || !buttons.length || !content) {
        console.error('First-semester web syllabus could not initialize: required data or page elements are missing.');
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

    function appendCourseContent(card, course, subjectId) {
        const body = document.createElement('div');
        const unitList = document.createElement('ul');
        unitList.className = 'subject-units';
        body.append(unitList);

        const courseOutcomes = window.firstSemesterWebOutcomes?.[subjectId] || {};
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

    function renderSubject(button) {
        buttons.forEach((item) => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.classList.toggle('theory-active', active && item.dataset.type === 'theory');
            item.classList.toggle('lab-active', active && item.dataset.type === 'lab');
            item.setAttribute('aria-pressed', String(active));
        });

        const subjectId = button.dataset.target.replace(/^subject-/, '');
        const course = syllabusData[subjectId];
        content.replaceChildren();

        const card = document.createElement('section');
        card.className = `info-card subject-card ${button.dataset.type === 'lab' ? 'lab-card' : 'theory-card'}`;

        const heading = document.createElement('h2');
        heading.className = button.dataset.type === 'lab' ? 'lab-heading' : 'theory-heading';
        heading.textContent = button.textContent.trim();
        card.append(heading);

        if (!course || !course.content.length) {
            const message = document.createElement('p');
            message.textContent = `Syllabus content is unavailable for subject ${subjectId}.`;
            card.append(message);
        } else {
            appendCourseContent(card, course, subjectId);
        }

        content.append(card);
        addTopicActionControls();
    }

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
        renderSubject(firstTheorySubject);
    }
})();
