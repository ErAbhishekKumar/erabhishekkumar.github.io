(function () {
    if (window.cordova) {
        return;
    }

    const syllabusData = window.firstSemesterWebData;
    const buttons = [...document.querySelectorAll('.tab-btn[data-target]')];
    const content = document.getElementById('syllabus-content');
    const creditsToggle = document.getElementById('credits-toggle');
    const creditsTable = document.getElementById('credits-table-container');

    if (!syllabusData || !buttons.length || !content) {
        console.error('First-semester web syllabus could not initialize: required data or page elements are missing.');
        return;
    }

    function appendCourseContent(card, course) {
        const body = document.createElement('div');
        let outcomes;
        let references;
        let pendingReference = false;

        course.content.forEach((line) => {
            if (/^[\u2022\u25cf\u25e6\u25aa\u00b7\s]+$/.test(line)) {
                return;
            }

            if (/^Unit\s+\d/.test(line) || line === 'List of Experiments' || /^Perform any \d+ Experiments$/i.test(line)) {
                const heading = document.createElement('h3');
                heading.className = 'unit-title';
                heading.textContent = line;
                body.append(heading);
                outcomes = null;
                references = null;
                pendingReference = false;
                return;
            }

            if (/^(Theory|Practical\/Lab) Session Outcomes/.test(line)) {
                const heading = document.createElement('h4');
                heading.className = 'sub-heading';
                heading.textContent = line;
                body.append(heading);
                outcomes = document.createElement('ul');
                outcomes.className = 'outcomes-list';
                body.append(outcomes);
                references = null;
                return;
            }

            if (/^Text\/Reference Books$/i.test(line)) {
                const heading = document.createElement('h3');
                heading.className = 'sub-heading';
                heading.textContent = line;
                body.append(heading);
                references = document.createElement('ol');
                body.append(references);
                outcomes = null;
                pendingReference = false;
                return;
            }

            if (/^LE[-\s]*\d+/i.test(line)) {
                outcomes = outcomes || document.createElement('ul');
                if (!outcomes.isConnected) {
                    outcomes.className = 'outcomes-list';
                    body.append(outcomes);
                }
                const item = document.createElement('li');
                item.textContent = line;
                outcomes.append(item);
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

            if (outcomes) {
                const item = document.createElement('li');
                item.textContent = line;
                outcomes.append(item);
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
        heading.textContent = button.textContent.trim();
        card.append(heading);

        if (!course || !course.content.length) {
            const message = document.createElement('p');
            message.textContent = `Syllabus content is unavailable for subject ${subjectId}.`;
            card.append(message);
        } else {
            appendCourseContent(card, course);
        }

        content.append(card);
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
