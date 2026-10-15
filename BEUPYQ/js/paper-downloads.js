(function () {
    const paperList = document.getElementById('paper-list');
    if (!paperList) {
        return;
    }

    function getLocalPdfUrl(pdfUrl) {
        const filename = new URL(pdfUrl, window.location.href).pathname.split('/').pop();
        if (!filename || !filename.toLowerCase().endsWith('.pdf')) {
            throw new Error('The question-paper link does not contain a valid PDF filename.');
        }

        return new URL(`PYQ-PDFs/${encodeURIComponent(decodeURIComponent(filename))}`, document.baseURI).href;
    }

    window.downloadAndOpenPDF = function (pdfUrl) {
        try {
            window.open(getLocalPdfUrl(pdfUrl), '_blank', 'noopener,noreferrer');
        } catch (error) {
            console.error('Could not open the local question-paper PDF.', error);
            window.showMsg('Could not open this paper from the local PYQ-PDFs folder.');
        }
    };

    function addDownloadButtons() {
        paperList.querySelectorAll('.list-row').forEach(row => {
            if (row.parentElement.classList.contains('paper-item-row')) {
                return;
            }

            const handler = row.getAttribute('onclick') || '';
            const match = handler.match(/downloadAndOpenPDF\(\s*(['"])(.*?)\1\s*,/);
            if (!match) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'paper-item-row';
            row.parentNode.insertBefore(wrapper, row);
            wrapper.appendChild(row);

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'paper-download';
            button.setAttribute('aria-label', `Download ${row.querySelector('.col-label')?.textContent.trim() || 'question paper'} PDF`);
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path><path d="M12 15V3"></path></svg><span>PDF</span>';
            button.addEventListener('click', event => {
                event.preventDefault();
                event.stopPropagation();
                downloadPaper(match[2], button);
            });
            wrapper.appendChild(button);
        });
    }

    function downloadPaper(pdfUrl, button) {
        try {
            const link = document.createElement('a');
            link.href = getLocalPdfUrl(pdfUrl);
            link.download = decodeURIComponent(new URL(link.href).pathname.split('/').pop());
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Could not download the question-paper PDF.', error);
            window.showMsg('Could not download this paper from the local PYQ-PDFs folder.');
        }
    }

    const observer = new MutationObserver(addDownloadButtons);
    observer.observe(paperList, { childList: true });
    addDownloadButtons();
})();
