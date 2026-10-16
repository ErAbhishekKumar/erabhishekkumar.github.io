(function () {
    if (window.cordova) {
        return;
    }

    const groupScript = [...document.scripts].find((script) => /1st_g[123]\.js(?:[?#]|$)/.test(script.src));
    const groupId = groupScript?.src.match(/1st_g[123]/)?.[0];
    const groupData = groupId ? window.firstSemesterGroups?.[groupId] : null;
    const syllabusData = groupData?.courses;
    const book = (title, authors, details) => ({ title, authors, details });
    const referenceBooks = {
        '1st_g1': {
            '100102': [
                book('Higher Engineering Mathematics', 'B. S. Grewal', 'Khanna Publishers, 44 Ed. ISBN No:9788174091154'),
                book('Higher Engineering Mathematics', 'B. V. Ramana', 'Tata McGraw Hill New Delhi, 11th Ed, 2010, ISBN-13-978-0070634190'),
                book('Advanced Engineering Mathematics', 'Erwing Kreyszig', 'John Wiley & Sons, 10th Ed, ISBN-978-0470-15836-5'),
                book('A Textbook of Engineering Mathematics', 'N. P. Bali & Dr. Manish Goyal', 'University Science Press, 13th Ed, ISBN-978-93-83828-63-0'),
                book('Understanding Engineering Mathematics', 'John Bird', 'Routledge; First Edition ISBN 9780415662840')
            ],
            '100104': [
                book('Optics', 'Ajay Ghatak', 'Mcgraw Hill Education, 2012, 5th Edition, ISBN-10: 1259004340'),
                book('Principles of Lasers', 'O. Svelto', 'Springer Science & Business Media, 2010, 5th Ed, ISBN-10: 1441913017'),
                book('Introduction to Electrodynamics', 'David J. Griffiths', 'Pearson Education Cambridge University Press, 2023, 5th Edition, ISBN-10: 1009397729'),
                book('Principles of Electronic Materials and Devices', 'S. O. Kasap', 'McGraw Hill Education, Third Edition, 2006, ISBN-10: 0073104647'),
                book('Semiconductor Physics and Devices', 'Donald A. Neuman', 'McGraw-Hill Education, Fourth Edition, 2011, ISBN-10: 0073529583'),
                book('Introduction to Quantum Mechanics', 'David J. Griffiths', 'Pearson Education Cambridge University Press, 2016, 2nd Edition, ISBN-10: 1107179866')
            ],
            '100111': [
                book('Basic Electrical Engineering', 'D. P. Kothari, I. J. Nagrath', 'McGraw-Hill Education, 2019, ISBN: 978-9353165727'),
                book('Electronic Device & Circuit Theory', 'Robert L. Boylestad and Louis Nashelsky', 'Pearson, 2013, ISBN: 978-1292025636'),
                book('Digital Logic and Computer Design', 'M. Morris Mano', 'Pearson India, 2017, ISBN: 978-9332586048'),
                book('Electrical Machinery', 'P. S. Bimbhra', 'Khanna Publishers, 2024, ISBN: 978-9389139105')
            ],
            '100105': [
                book('Artificial Intelligence: A Modern Approach', 'Stuart Russell, Peter Norvig', 'Pearson; 4th Ed., 2020. ISBN: 978-0134610993'),
                book('AI for Everyone', 'Saptarsi Goswami, Amit Kumar Das, Amlan Chakrabarti', 'Pearson Education: ISBN-10: 9361591754, ISBN-13: 978-9361591754'),
                book('Introduction to Artificial Intelligence and Expert Systems', 'Dan W. Patterson', 'PHI Learning; 2015. ISBN: 978-8120307775'),
                book('Artificial Intelligence', 'Elaine Rich, Kevin Knight, Shivashankar B. Nair', 'McGraw-Hill; 3rd Ed., 2017. ISBN: 978-1259029420')
            ],
            '100108': [
                book('Computer Fundamentals', 'P. K. Sinha and Priti Sinha', 'BPB Publications, 6th Edition, ISBN: 978-8176567527'),
                book('Introduction to Computers', 'Peter Norton', 'McGraw Hill, 7th Edition, ISBN: 978-0070636774'),
                book('Data Representation and Computer Logic', 'Charles M. Gilmore', 'McGraw Hill, ISBN: 978-0070245754'),
                book('Operating System Concepts', 'Abraham Silberschatz, Peter B. Galvin and Greg Gagne', 'Wiley, 10th Edition, ISBN: 978-1119456339'),
                book('Data Communications and Networking', 'Behrouz A. Forouzan', 'McGraw Hill, 5th Edition, ISBN: 978-0073376226'),
                book('IoT for Beginners: Architecture, Principles and Applications', 'Amita Kapoor, Vinay Chopra', 'BPB Publications, 1st Edition, ISBN: 978-9355510063'),
                book('Fundamentals of Cyber Security', 'Mayank Bhushan, Rajkumar Singh Rathore, Aatif Jamshed', 'BPB Publications, 1st Edition, ISBN: 9789386551559'),
                book('Artificial Intelligence: A Guide for Thinking Humans', 'Melanie Mitchell', 'Farrar, Straus and Giroux, 1st Edition, ISBN: 9780374257835')
            ]
        },
        '1st_g2': {
            '100101': [
                book('Communicative English for Engineers and Professionals', 'Nitin Bhatnagar, Mamta Bhatnagar', 'Publisher: Pearson Education; Edition: 1st Edition, Year: 2010; ISBN: 978-8131724323'),
                book('Oxford Communicative English', 'Oxford University Press', 'Edition: Latest Revised Edition; Year: 2014, ISBN: 978-0198076018'),
                book('Technical Communication: Principles and Practice', 'Meenakshi Raman, Sangeeta Sharma', 'Edition: 3rd Edition, Year: 2015; ISBN: 978-0199452132'),
                book('Communication Skills in English', 'Dr. Anjana Tiwari', 'Khanna Publishers, New Delhi'),
                book('Business Communication', 'Dr. Nishith Rajaram Dubey, Anupam Singh', 'Indra Publishing House, 2023; ISBN-978-93-93577-69-6'),
                book('Employability Skills', 'Dr. Nishith Rajaram Dubey, Anupam Singh', 'Indra Publishing House, 2023; ISBN 978-93-93577-68-9'),
                book('Essential English Grammar in Use', 'Raymond Murphy', 'Cambridge University Press')
            ],
            '100102': [
                book('Higher Engineering Mathematics', 'B. S. Grewal', 'Khanna Publishers, 44 Ed. ISBN No:9788174091154'),
                book('Higher Engineering Mathematics', 'B. V. Ramana', 'Tata McGraw Hill New Delhi, 11th Ed, 2010, ISBN-13-978-0070634190'),
                book('Advanced Engineering Mathematics', 'Erwing Kreyszig', 'John Wiley & Sons, 10th Ed, ISBN-978-0470-15836-5'),
                book('A Textbook of Engineering Mathematics', 'N. P. Bali & Dr. Manish Goyal', 'University Science Press, 13th Ed, ISBN-978-93-83828-63-0'),
                book('Understanding Engineering Mathematics', 'John Bird', 'Routledge; First Edition ISBN 9780415662840')
            ],
            '100104': [
                book('Optics', 'Ajay Ghatak', 'Mcgraw Hill Education, 2012, 5th Edition, ISBN-10: 1259004340'),
                book('Principles of Lasers', 'O. Svelto', 'Springer Science & Business Media, 2010, 5th Ed, ISBN-10: 1441913017'),
                book('Introduction to Electrodynamics', 'David J. Griffiths', 'Pearson Education Cambridge University Press, 2023, 5th Edition, ISBN-10: 1009397729'),
                book('Principles of Electronic Materials and Devices', 'S. O. Kasap', 'McGraw Hill Education, Third Edition, 2006, ISBN-10: 0073104647'),
                book('Semiconductor Physics and Devices', 'Donald A. Neuman', 'McGraw-Hill Education, Fourth Edition, 2011, ISBN-10: 0073529583'),
                book('Introduction to Quantum Mechanics', 'David J. Griffiths', 'Pearson Education Cambridge University Press, 2016, 2nd Edition, ISBN-10: 1107179866'),
                book('Nanotechnology: Principles and Practices', 'Sulabha K. Kulkarni', 'Springer Nature, Third Edition, 2014, ISBN-10: 3319091700'),
                book('Concepts of Engineering Physics', 'S. K. Roy', 'Novelty Publication, 1st Edition, 2016-17'),
                book('Concepts of Engineering Physics', 'Kumari Mamta and Raj Kumar Singh', 'CRC Press-Taylor and Francis, United Kingdom, 1st Edition, ISBN 9781041191834')
            ],
            '100106': [
                book('Basic Electrical and Electronics Engineering', 'Vinoth Kumar K., Saravanakumar R., Jegathesan V., Kowsalya M., Mahesh M.', 'Wiley India, New Delhi, 2nd Ed., 2022, ISBN: 978-9354643194'),
                book('Fundamentals of Electrical and Electronics Engineering (with Lab Manual)', 'Susan S. Mathew and Saji T. Chacko', 'Khanna Book Publishing Co., 2021, ISBN: 978-9391505592'),
                book('Basic Electrical Engineering', 'V. Mittle, Arvind Mittle', 'McGraw Hill Education, 2017, ISBN: 978-0070593572'),
                book('Basic Electrical Engineering', 'D. C. Kulshreshtha', 'Tata McGraw-Hill, 3rd Ed., 2019, ISBN: 978-0070083929'),
                book('Basic Electrical and Electronics Engineering', 'D. P. Kothari & I. J. Nagrath', 'Tata McGraw Hill, 2nd Ed., 2020, ISBN: 978-9389811247'),
                book('Principles of Electrical Engineering', 'V. K. Mehta and Rohit Mehta', 'S. Chand & Co., 2nd Ed., 2018')
            ],
            '100105': [
                book('Artificial Intelligence: A Modern Approach', 'Stuart Russell, Peter Norvig', 'Pearson; 4th Ed., 2020. ISBN: 978-0134610993'),
                book('AI for Everyone', 'Saptarsi Goswami, Amit Kumar Das, Amlan Chakrabarti', 'Pearson Education: ISBN-10: 9361591754, ISBN-13: 978-9361591754'),
                book('Introduction to Artificial Intelligence and Expert Systems', 'Dan W. Patterson', 'PHI Learning; 2015. ISBN: 978-8120307775'),
                book('Artificial Intelligence', 'Elaine Rich, Kevin Knight, Shivashankar B. Nair', 'McGraw-Hill; 3rd Ed., 2017. ISBN: 978-1259029420'),
                book('Artificial Intelligence - A Modern Approach', 'Dilip Narayan Sahu, Kishore Kumar Dash, Abahy Kolhe, Agilandeswari Devarajan', 'ISBN-10: 9355151446; ISBN-13: 978-9355151445'),
                book('Machine Learning Essentials', 'Dhairya Parikh', 'Vibrant Publishers; ISBN-10: 1636513778, ISBN-13: 978-1636513775')
            ]
        },
        '1st_g3': {
            '100101': null,
            '100102': null,
            '100103': [
                book('Engineering Chemistry', 'Jain and Jain', 'Dhanpat Rai Publishing Co., 17th Ed. (ISBN: 978-9383182626)'),
                book('A Textbook of Engineering Chemistry', 'Shashi Chawla', 'Dhanpat Rai & Co., 2024 Ed. (ISBN: 978-8127262143)'),
                book('Principles of Materials Science and Engineering', 'William F. Smith', 'McGraw-Hill Education, 3rd Ed. (ISBN: 978-0070592025)'),
                book('Concise Inorganic Chemistry', 'J. D. Lee', 'Oxford University Press, 5th Ed. (ISBN: 978-0632052936)')
            ],
            '100107': [
                book('Engineering Drawing', 'N. D. Bhatt', 'Charotar Publishing House'),
                book('Engineering Drawing', 'P. J. Shah', 'S. Chand Publisher'),
                book('Engineering Drawing', 'K. Venu Gopal & V. Prabu Raja', 'New Age Publications'),
                book('Engineering Drawing and Graphics + AutoCAD', 'Venugopal K.', 'New Age International Publishers, Delhi, 2022, ISBN: 978-8122472752'),
                book('Engineering Drawing', 'Basant Agrawal and Agrawal C. M.', 'Tata McGraw Hill, New Delhi, 2013, ISBN: 978-1259062889'),
                book('Engineering Graphics', 'S. K. Pradhan, K. K. Jain', 'Khanna Book Publishing Company Pvt. Ltd., New Delhi, ASIN: B0BM5BMMXT, ISBN-10: 9355381891'),
                book('Bureau of Indian Standards, Engineering Drawing Practice for Schools and Colleges IS: SP-46, BIS', 'BIS, Government of India', 'BIS, Government of India, Third Reprint, October 1998; ISBN: 81-7061-091-2')
            ],
            '100105': [
                book('Artificial Intelligence: A Modern Approach', 'Stuart Russell, Peter Norvig', 'Pearson; 4th Ed., 2020. ISBN: 978-0134610993'),
                book('AI for Everyone', 'Saptarsi Goswami, Amit Kumar Das, Amlan Chakrabarti', 'Pearson Education: ISBN-10: 9361591754, ISBN-13: 978-9361591754'),
                book('Introduction to Artificial Intelligence and Expert Systems', 'Dan W. Patterson', 'PHI Learning; 2015. ISBN: 978-8120307775'),
                book('Artificial Intelligence', 'Elaine Rich, Kevin Knight, Shivashankar B. Nair', 'McGraw-Hill; 3rd Ed., 2017. ISBN: 978-1259029420'),
                book('Artificial Intelligence - A Modern Approach', 'Dilip Narayan Sahu, Kishore Kumar Dash, Abahy Kolhe, Agilandeswari Devarajan', 'ISBN-10: 9355151446; ISBN-13: 978-9355151445'),
                book('Machine Learning Essentials', 'Dhairya Parikh', 'Vibrant Publishers; ISBN-10: 1636513778, ISBN-13: 978-1636513775')
            ]
        }
    };
    referenceBooks['1st_g3']['100101'] = referenceBooks['1st_g2']['100101'].slice(0, 6);
    referenceBooks['1st_g3']['100102'] = referenceBooks['1st_g2']['100102'];
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

        const table = document.createElement('table');
        table.className = 'reference-table';

        const caption = document.createElement('caption');
        caption.textContent = 'Text/Reference Books';
        table.append(caption);

        const head = document.createElement('thead');
        const headRow = document.createElement('tr');
        ['S. No.', 'Titles', 'Author(s)', 'Publisher and Edition with ISBN'].forEach((label) => {
            const cell = document.createElement('th');
            cell.textContent = label;
            headRow.append(cell);
        });
        head.append(headRow);
        table.append(head);

        const body = document.createElement('tbody');
        table.append(body);

        references.forEach((reference) => {
            const row = document.createElement('tr');
            const number = document.createElement('td');
            number.textContent = String(body.children.length + 1);
            const title = document.createElement('td');
            const authors = document.createElement('td');
            const details = document.createElement('td');
            if (typeof reference === 'string') {
                title.textContent = reference.replace(/^\d+\.\s*/, '');
            } else {
                title.textContent = reference.title || '';
                authors.textContent = reference.authors || '';
                details.textContent = reference.details || '';
            }
            row.append(number, title, authors, details);
            body.append(row);
        });
        parent.append(table);
    }

    function appendCourseContent(card, course, courseId) {
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
        let referenceNumber = '';

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
                topics = document.createElement('ul');
                topics.className = 'unit-topics';
                unitList.append(topics);
                references = null;
                return;
            }

            if (
                line === 'List of Experiments' ||
                line === 'Laboratory Experiment/ Practical Titles' ||
                line === 'Practical Titles' ||
                line === 'Titles' ||
                /^Perform any \d+ Experiments$/i.test(line)
            ) {
                const heading = document.createElement('h3');
                heading.className = 'sub-heading';
                heading.textContent = line;
                body.insertBefore(heading, unitList);
                topics = document.createElement('ul');
                topics.className = 'unit-topics';
                unitList.append(topics);
                references = null;
                return;
            }

            if (/^Text\/Reference Books$/i.test(line)) {
                const table = document.createElement('table');
                table.className = 'reference-table';
                const caption = document.createElement('caption');
                caption.textContent = line;
                table.append(caption);

                const head = document.createElement('thead');
                const headRow = document.createElement('tr');
                ['S. No.', 'Titles', 'Author(s)', 'Publisher and Edition with ISBN'].forEach((label) => {
                    const cell = document.createElement('th');
                    cell.textContent = label;
                    headRow.append(cell);
                });
                head.append(headRow);
                table.append(head);

                references = document.createElement('tbody');
                table.append(references);
                body.append(table);
                topics = null;
                unitItem = null;
                pendingReference = false;
                referenceNumber = '';
                return;
            }

            if (/^LE[-\s]*\d+/i.test(line)) {
                if (!topics) {
                    topics = document.createElement('ul');
                    topics.className = 'unit-topics';
                    unitList.append(topics);
                }
                const item = document.createElement('li');
                const experimentNumber = line.match(/^LE[-\s]*(\d+)/i)?.[1];
                const labOutcomes = (courseOutcomes.practical || []).filter((outcome) =>
                    new RegExp(`^LSO\\s+${experimentNumber}\\.`).test(outcome)
                );
                if (labOutcomes.length) {
                    appendOutcomeDetails(item, 'Lab Session Outcomes (LSOs)', labOutcomes);
                }
                item.append(line);
                topics.append(item);
                return;
            }

            if (references && /^\d+\.$/.test(line)) {
                pendingReference = true;
                referenceNumber = line.replace('.', '');
                return;
            }

            if (references && pendingReference) {
                const row = document.createElement('tr');
                const number = document.createElement('td');
                number.textContent = referenceNumber;
                const book = document.createElement('td');
                book.textContent = line.replace(/^\d+\.\s*/, '');
                const authors = document.createElement('td');
                const details = document.createElement('td');
                row.append(number, book, authors, details);
                references.append(row);
                pendingReference = false;
                referenceNumber = '';
                return;
            }

            if (topics) {
                const item = document.createElement('li');
                item.textContent = line;
                topics.append(item);
                return;
            }

            if (references && references.lastElementChild) {
                const book = references.lastElementChild.lastElementChild;
                if (book) {
                    book.textContent += ` ${line}`;
                }
                return;
            }

            const paragraph = document.createElement('p');
            paragraph.textContent = line;
            body.append(paragraph);
        });

        card.append(body);
        if (!card.querySelector('.reference-table')) {
            appendReferenceBooks(card, referenceBooks[groupId]?.[courseId] ?? course.references);
        }
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
            appendCourseContent(card, course, subjectId);
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
