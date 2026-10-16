(() => {
    const initializePrintControls = () => {
        const title = document.querySelector('.page-title, h1')?.textContent.trim() || 'Syllabus';
        const branch = document.querySelector('.page-subtitle')?.textContent.trim() || '';
        const printTitle = [branch, title].filter(Boolean).join(' - ');
        const pagePath = window.location.pathname;
        const sourceUrl = window.location.protocol === 'file:'
            ? `https://erabhishekkumar.github.io/BEUPYQ/${pagePath.split('/').pop()}`
            : new URL(pagePath, window.location.origin).href;

        const actions = document.createElement('div');
        actions.id = 'syllabus-print-actions';

        const printButton = document.createElement('button');
        printButton.type = 'button';
        printButton.textContent = 'Print / Save as PDF';
        printButton.title = 'Opens the print dialog; select a printer or Save as PDF.';
        printButton.addEventListener('click', () => window.print());
        actions.append(printButton);

        const header = document.createElement('div');
        header.id = 'syllabus-print-header';

        const heading = document.createElement('strong');
        heading.id = 'syllabus-print-heading';
        heading.textContent = printTitle;

        const source = document.createElement('div');
        source.id = 'syllabus-print-source';
        source.append('Source: ');

        const link = document.createElement('a');
        link.href = sourceUrl;
        link.textContent = 'Syllabus';

        const url = document.createElement('span');
        url.id = 'syllabus-print-source-url';
        url.textContent = ` — ${sourceUrl}`;
        source.append(link, url);
        header.append(heading, source);

        const footer = document.createElement('div');
        footer.id = 'syllabus-print-footer';
        footer.append(`${printTitle}  |  Source: `);
        const footerLink = document.createElement('a');
        footerLink.href = sourceUrl;
        footerLink.textContent = 'Syllabus';
        footer.append(footerLink);

        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.after(actions);
        } else {
            document.querySelector('main, .content, body')?.prepend(actions);
        }
        // Keep the print header in normal document flow. Chromium's paged
        // print layout can place fixed elements over content at page breaks.
        const printContainer = document.querySelector('.app') || document.body;
        printContainer.prepend(header);
        printContainer.append(footer);

        let detailsState = null;
        let creditsState = null;
        let previousTitle = '';

        window.addEventListener('beforeprint', () => {
            if (detailsState !== null) {
                return;
            }

            previousTitle = document.title;
            document.title = printTitle;

            const details = [...document.querySelectorAll('details')];
            detailsState = details.map((element) => [element, element.open]);
            details.forEach((element) => {
                element.open = true;
            });

            const credits = document.getElementById('credits-table-container');
            if (credits) {
                creditsState = credits.classList.contains('expanded');
                credits.classList.add('expanded');
            }
        });

        window.addEventListener('afterprint', () => {
            if (detailsState) {
                detailsState.forEach(([element, wasOpen]) => {
                    element.open = wasOpen;
                });
                detailsState = null;
            }

            const credits = document.getElementById('credits-table-container');
            if (credits && creditsState === false) {
                credits.classList.remove('expanded');
            }
            creditsState = null;
            if (previousTitle) {
                document.title = previousTitle;
                previousTitle = '';
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePrintControls, { once: true });
    } else {
        initializePrintControls();
    }
})();
