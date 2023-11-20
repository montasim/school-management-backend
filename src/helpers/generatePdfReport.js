import PDFDocument from 'pdfkit';
import fs from 'fs';
import fetch from 'node-fetch'; // Importing node-fetch for fetching images

const generatePdfReport = async (administrationData, filename) => {
    const doc = new PDFDocument({
        margin: 50, // Set global margins for the document
        size: 'A4',
    });

    doc.pipe(fs.createWriteStream(filename));

    // Styling variables
    const titleFontSize = 22;
    const sectionFontSize = 16;
    const contentFontSize = 12;
    const lineSpacing = 6;

    // Define Colors
    const titleColor = '#123456';
    const sectionColor = '#345678';
    const contentColor = 'black';

    // Define Fonts (assuming the fonts are pre-installed or loaded)
    const titleFont = 'Helvetica-Bold';
    const sectionFont = 'Helvetica';
    const contentFont = 'Helvetica';

    // Header
    doc.fontSize(titleFontSize)
        .fillColor(titleColor)
        .font(titleFont)
        .text('Administration Report', { align: 'center', underline: true })
        .moveDown(2);

    // Iterate through each admin item
    for (const admin of administrationData) {
        // Image handling
        if (admin?.downloadLink) {
            try {
                const response = await fetch(admin?.downloadLink);
                const buffer = await response.arrayBuffer();
                doc.image(buffer, {
                    fit: [150, 150],
                    align: 'center',
                    valign: 'center'
                }).moveDown();
            } catch (error) {
                console.error('Error fetching image:', error);
                doc.fillColor('red').text('Error loading image').moveDown();
            }
        }

        // Admin Details
        doc.fillColor(sectionColor)
            .fontSize(sectionFontSize)
            .font(sectionFont)
            .text(`Name: ${admin.name}`)
            .moveDown(0.5);

        doc.fillColor(contentColor)
            .fontSize(contentFontSize)
            .font(contentFont)
            .text(`Designation: ${admin.designation}`)
            .text(`Created At: ${admin.createdAt}`)
            .text(`Created By: ${admin.createdBy}`)
            .text(`Last Modified At: ${admin.modifiedAt}`)
            .text(`Modified By: ${admin.modifiedBy}`)
            .text(`Category: ${admin.category}`)
            .moveDown();

        // Separator Line
        doc.strokeColor('#DDD')
            .lineWidth(1)
            .moveDown(0.5)
            .lineWidth(1)
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .stroke()
            .moveDown();

        // Add a page break if not the last item
        if (admin !== administrationData[administrationData.length - 1]) {
            doc.addPage();
        }
    }

    // Page Numbers in Footer
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.count; i++) {
        doc.switchToPage(i);
        doc.fillColor('black')
            .fontSize(10)
            .text(`Page ${i + 1} of ${range.count}`, 50, doc.page.height - 50, {
                align: 'center'
            });
    }

    doc.end();
};
export default generatePdfReport;