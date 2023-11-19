import PDFDocument from 'pdfkit';
import fs from 'fs';
import fetch from 'node-fetch'; // Importing node-fetch for fetching images

// Helper function to convert Google Drive shareable link to a direct link


const generatePdfReport = async (administrationData, filename) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filename));

    const titleFontSize = 18;
    const sectionFontSize = 14;
    const contentFontSize = 12;

    // Define Colors
    const titleColor = '#123456'; // Replace with your preferred color
    const sectionColor = '#345678'; // Replace with your preferred color

    // Header
    doc.fontSize(titleFontSize).fillColor(titleColor).text('Administration Report', { underline: true }).moveDown(2);

    for (const admin of administrationData) {
        if (admin.googleDriveShareableLink) {
            const imageUrl = convertToDirectImageUrl(admin.googleDriveShareableLink);
            if (imageUrl) {
                try {
                    const response = await fetch(imageUrl);
                    const buffer = await response.arrayBuffer();
                    doc.image(buffer, {
                        fit: [100, 100],
                        align: 'center',
                        valign: 'center'
                    }).moveDown();
                } catch (error) {
                    console.error('Error fetching image:', error);
                    doc.text('Error loading image').moveDown();
                }
            }
        }

        // Content
        doc.fillColor('black').fontSize(sectionFontSize).text(`Name: ${admin.name}`);
        doc.fontSize(contentFontSize).text(`Designation: ${admin.designation}`);

        doc.fontSize(14).text(`Name: ${admin.name}`);
        doc.text(`Designation: ${admin.designation}`);
        doc.text(`Created At: ${admin.createdAt}`);
        doc.text(`Created By: ${admin.createdBy}`);
        doc.text(`Last Modified At: ${admin.modifiedAt}`);
        doc.text(`Modified By: ${admin.modifiedBy}`);
        doc.text(`Category: ${admin.category}`).moveDown(2);

        // Separator Line
        doc.moveDown().strokeColor('#DDD').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown();

        // Add a page break if not the last item
        if (admin !== administrationData[administrationData.length - 1]) {
            doc.addPage();
        }
    }

    // Page Numbers in Footer
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(10).fillColor('black').text(`Page ${i + 1} of ${range.count}`, 50, doc.page.height - 50, {
            align: 'center'
        });
    }

    doc.end();
};

export default generatePdfReport;