import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceData } from '../types/invoice';
import { calculateInvoiceTotals, formatDate, formatMoney } from './currency';
import { getPdfFontFamily } from './fonts';

export async function generateInvoicePdf(
  invoice: InvoiceData
): Promise<{ success: boolean; error?: string; doc?: jsPDF; filename?: string }> {
  try {
    const isLetter = invoice.customization.pageSize === 'letter';
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: isLetter ? 'letter' : 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Margins
    let margin = 40;
    if (invoice.customization.pageMargins === 'compact') margin = 28;
    if (invoice.customization.pageMargins === 'wide') margin = 54;

    const contentWidth = pageWidth - margin * 2;
    const totals = calculateInvoiceTotals(invoice);
    const baseFont = getPdfFontFamily(invoice.customization.fontFamily);
    const accent = invoice.customization.accentColor || '#FF8F70';

    // Helper hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
      const clean = hex.replace('#', '');
      if (clean.length === 3) {
        return [
          parseInt(clean[0] + clean[0], 16),
          parseInt(clean[1] + clean[1], 16),
          parseInt(clean[2] + clean[2], 16),
        ];
      }
      return [
        parseInt(clean.substring(0, 2), 16) || 40,
        parseInt(clean.substring(2, 4), 16) || 40,
        parseInt(clean.substring(4, 6), 16) || 40,
      ];
    };

    const [r, g, b] = hexToRgb(accent);

    let cursorY = margin;

    // Standard Professional Header
    if (invoice.logoUrl) {
      try {
        doc.addImage(invoice.logoUrl, 'PNG', margin, cursorY, 110, 48, undefined, 'FAST');
      } catch {}
    }

    doc.setTextColor(31, 41, 55);
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(24);
    doc.text(invoice.title || 'INVOICE', pageWidth - margin, cursorY + 22, { align: 'right' });

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.setFont(baseFont, 'normal');
    doc.text(`# ${invoice.number}`, pageWidth - margin, cursorY + 38, { align: 'right' });

    cursorY += 60;

    // FROM & TO COLUMNS + DATES
    const colWidth = (contentWidth - 20) / 2;
    const fromX = margin;
    const toX = margin + colWidth + 20;

    const startInfoY = cursorY;

    // FROM Block
    doc.setTextColor(r, g, b);
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(9);
    doc.text('FROM', fromX, cursorY);

    doc.setTextColor(31, 41, 55);
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(11);
    cursorY += 14;
    doc.text(invoice.fromName || 'Your Business Name', fromX, cursorY);

    doc.setFont(baseFont, 'normal');
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);

    if (invoice.fromAddress) {
      cursorY += 12;
      doc.text(invoice.fromAddress, fromX, cursorY);
    }
    if (invoice.fromCityState || invoice.fromZip) {
      cursorY += 12;
      doc.text(`${invoice.fromCityState || ''} ${invoice.fromZip || ''}`.trim(), fromX, cursorY);
    }
    if (invoice.fromEmail) {
      cursorY += 12;
      doc.text(invoice.fromEmail, fromX, cursorY);
    }
    if (invoice.fromPhone) {
      cursorY += 12;
      doc.text(invoice.fromPhone, fromX, cursorY);
    }
    if (invoice.fromTaxId) {
      cursorY += 12;
      doc.text(`Tax ID: ${invoice.fromTaxId}`, fromX, cursorY);
    }
    if (invoice.fromAdditional) {
      cursorY += 12;
      doc.text(invoice.fromAdditional, fromX, cursorY);
    }

    const fromEndY = cursorY;

    // TO Block
    let toCursorY = startInfoY;
    doc.setTextColor(r, g, b);
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(9);
    doc.text('BILL TO', toX, toCursorY);

    doc.setTextColor(31, 41, 55);
    doc.setFont(baseFont, 'bold');
    doc.setFontSize(11);
    toCursorY += 14;
    doc.text(invoice.toName || 'Client Name', toX, toCursorY);

    doc.setFont(baseFont, 'normal');
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);

    if (invoice.toAddress) {
      toCursorY += 12;
      doc.text(invoice.toAddress, toX, toCursorY);
    }
    if (invoice.toCityState || invoice.toZip) {
      toCursorY += 12;
      doc.text(`${invoice.toCityState || ''} ${invoice.toZip || ''}`.trim(), toX, toCursorY);
    }
    if (invoice.toEmail) {
      toCursorY += 12;
      doc.text(invoice.toEmail, toX, toCursorY);
    }
    if (invoice.toPhone) {
      toCursorY += 12;
      doc.text(invoice.toPhone, toX, toCursorY);
    }
    if (invoice.toTaxId) {
      toCursorY += 12;
      doc.text(`Tax ID / VAT: ${invoice.toTaxId}`, toX, toCursorY);
    }

    const maxInfoY = Math.max(fromEndY, toCursorY) + 18;

    // INVOICE METADATA ROW (Date, Due Date, Terms, PO)
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, maxInfoY, contentWidth, 34, 3, 3, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, maxInfoY, contentWidth, 34, 3, 3, 'D');

    const metaItemWidth = contentWidth / 4;
    const metaY = maxInfoY + 13;

    // Invoice Date
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont(baseFont, 'bold');
    doc.text('INVOICE DATE', margin + 12, metaY);
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(8.5);
    doc.setFont(baseFont, 'normal');
    doc.text(formatDate(invoice.date, invoice.customization.dateFormat) || '-', margin + 12, metaY + 12);

    // Due Date
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont(baseFont, 'bold');
    doc.text('DUE DATE', margin + metaItemWidth + 6, metaY);
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(8.5);
    doc.setFont(baseFont, 'normal');
    doc.text(formatDate(invoice.dueDate, invoice.customization.dateFormat) || '-', margin + metaItemWidth + 6, metaY + 12);

    // Terms
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont(baseFont, 'bold');
    doc.text('PAYMENT TERMS', margin + metaItemWidth * 2 + 6, metaY);
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(8.5);
    doc.setFont(baseFont, 'normal');
    const termsMap: Record<string, string> = {
      on_receipt: 'On Receipt',
      net_7: 'Net 7 Days',
      net_15: 'Net 15 Days',
      net_30: 'Net 30 Days',
      net_45: 'Net 45 Days',
      net_60: 'Net 60 Days',
      custom: 'Custom Terms',
    };
    doc.text(termsMap[invoice.paymentTerms] || 'Due on Receipt', margin + metaItemWidth * 2 + 6, metaY + 12);

    // PO or Balance Due Quick Tag
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(7.5);
    doc.setFont(baseFont, 'bold');
    doc.text(invoice.poNumber ? 'P.O. NUMBER' : 'BALANCE DUE', margin + metaItemWidth * 3 + 6, metaY);
    doc.setTextColor(r, g, b);
    doc.setFontSize(8.5);
    doc.setFont(baseFont, 'bold');
    if (invoice.poNumber) {
      doc.text(invoice.poNumber, margin + metaItemWidth * 3 + 6, metaY + 12);
    } else {
      doc.text(
        formatMoney(totals.balanceDue, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
        margin + metaItemWidth * 3 + 6,
        metaY + 12
      );
    }

    cursorY = maxInfoY + 46;

    // TABLE OF LINE ITEMS
    const tableBody = invoice.items.map((item, index) => {
      const lineAmt = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
      let descText = item.description || `Item ${index + 1}`;
      if (item.details) {
        descText += `\n${item.details}`;
      }
      return [
        descText,
        item.quantity.toString(),
        formatMoney(item.rate, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
        formatMoney(lineAmt, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
      ];
    });

    autoTable(doc, {
      startY: cursorY,
      margin: { left: margin, right: margin },
      head: [['DESCRIPTION', 'QTY', 'RATE', 'AMOUNT']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        font: baseFont,
        fillColor: [r, g, b],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
        cellPadding: 7,
      },
      styles: {
        font: baseFont,
        fontSize: 8.5,
        cellPadding: 6,
        textColor: [31, 41, 55],
        lineColor: [229, 231, 235],
        lineWidth: 0.5,
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 50, halign: 'center' },
        2: { cellWidth: 80, halign: 'right' },
        3: { cellWidth: 90, halign: 'right', fontStyle: 'bold' },
      },
      alternateRowStyles: {
        fillColor: [250, 250, 252],
      },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 14;

    // TOTALS SECTION (Right aligned)
    const totalsWidth = 240;
    const totalsX = pageWidth - margin - totalsWidth;
    let totalsY = finalY;

    // Subtotal
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8.5);
    doc.setFont(baseFont, 'normal');
    doc.text('Subtotal:', totalsX, totalsY);
    doc.setTextColor(31, 41, 55);
    doc.setFont(baseFont, 'bold');
    doc.text(
      formatMoney(totals.subtotal, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
      pageWidth - margin,
      totalsY,
      { align: 'right' }
    );

    // Discount if any
    if (totals.discountAmount > 0) {
      totalsY += 14;
      doc.setTextColor(100, 116, 139);
      doc.setFont(baseFont, 'normal');
      doc.text(
        `Discount (${invoice.customization.discountType === 'percent' ? invoice.customization.discountRate + '%' : 'Flat'}):`,
        totalsX,
        totalsY
      );
      doc.setTextColor(220, 38, 38);
      doc.setFont(baseFont, 'bold');
      doc.text(
        `-${formatMoney(totals.discountAmount, invoice.customization.currencySymbol, invoice.customization.currencyPosition)}`,
        pageWidth - margin,
        totalsY,
        { align: 'right' }
      );
    }

    // Tax if any
    if (totals.taxAmount > 0) {
      totalsY += 14;
      doc.setTextColor(100, 116, 139);
      doc.setFont(baseFont, 'normal');
      doc.text(
        `${invoice.customization.taxLabel || 'Tax'} (${invoice.customization.taxType === 'percent' ? invoice.customization.taxRate + '%' : 'Flat'}):`,
        totalsX,
        totalsY
      );
      doc.setTextColor(31, 41, 55);
      doc.setFont(baseFont, 'bold');
      doc.text(
        formatMoney(totals.taxAmount, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
        pageWidth - margin,
        totalsY,
        { align: 'right' }
      );
    }

    // Divider
    totalsY += 10;
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(1);
    doc.line(totalsX, totalsY, pageWidth - margin, totalsY);

    // Total
    totalsY += 14;
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.setFont(baseFont, 'bold');
    doc.text('Total:', totalsX, totalsY);
    doc.text(
      formatMoney(totals.total, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
      pageWidth - margin,
      totalsY,
      { align: 'right' }
    );

    // Amount Paid if enabled
    if (invoice.customization.showAmountPaid && totals.amountPaid > 0) {
      totalsY += 14;
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8.5);
      doc.setFont(baseFont, 'normal');
      doc.text('Amount Paid:', totalsX, totalsY);
      doc.setTextColor(16, 185, 129);
      doc.setFont(baseFont, 'bold');
      doc.text(
        formatMoney(totals.amountPaid, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
        pageWidth - margin,
        totalsY,
        { align: 'right' }
      );
    }

    // Balance Due Banner
    totalsY += 12;
    doc.setFillColor(r, g, b);
    doc.roundedRect(totalsX, totalsY, totalsWidth, 26, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(baseFont, 'bold');
    doc.text('BALANCE DUE', totalsX + 10, totalsY + 17);
    doc.setFontSize(11);
    doc.text(
      formatMoney(totals.balanceDue, invoice.customization.currencySymbol, invoice.customization.currencyPosition),
      pageWidth - margin - 10,
      totalsY + 17,
      { align: 'right' }
    );

    // NOTES, PAYMENT DETAILS, AND SIGNATURE (Left & Bottom)
    let leftY = finalY;

    if (invoice.customization.showNotes && invoice.notes) {
      doc.setTextColor(r, g, b);
      doc.setFontSize(8.5);
      doc.setFont(baseFont, 'bold');
      doc.text('NOTES & TERMS', margin, leftY);

      leftY += 12;
      doc.setTextColor(75, 85, 99);
      doc.setFontSize(8);
      doc.setFont(baseFont, 'normal');
      const splitNotes = doc.splitTextToSize(invoice.notes, contentWidth - totalsWidth - 30);
      doc.text(splitNotes, margin, leftY);
      leftY += splitNotes.length * 10 + 10;
    }

    if (invoice.customization.showPaymentDetails && invoice.paymentDetails) {
      doc.setTextColor(r, g, b);
      doc.setFontSize(8.5);
      doc.setFont(baseFont, 'bold');
      doc.text('PAYMENT INSTRUCTIONS', margin, leftY);

      leftY += 12;
      doc.setTextColor(75, 85, 99);
      doc.setFontSize(8);
      doc.setFont(baseFont, 'normal');
      const splitPay = doc.splitTextToSize(invoice.paymentDetails, contentWidth - totalsWidth - 30);
      doc.text(splitPay, margin, leftY);
      leftY += splitPay.length * 10 + 10;
    }

    // SIGNATURE SECTION
    const bottomY = Math.max(leftY, totalsY + 36);
    if (invoice.customization.showSignature && (invoice.signatureUrl || invoice.signerName)) {
      let sigY = bottomY;
      if (sigY + 70 > pageHeight - margin) {
        doc.addPage();
        sigY = margin;
      }

      if (invoice.signatureUrl) {
        try {
          doc.addImage(invoice.signatureUrl, 'PNG', margin, sigY, 110, 40, undefined, 'FAST');
          sigY += 42;
        } catch {}
      }

      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.75);
      doc.line(margin, sigY + 5, margin + 160, sigY + 5);

      if (invoice.signerName) {
        doc.setTextColor(31, 41, 55);
        doc.setFontSize(8.5);
        doc.setFont(baseFont, 'bold');
        doc.text(invoice.signerName, margin, sigY + 16);
      }
      if (invoice.signerTitle) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(7.5);
        doc.setFont(baseFont, 'normal');
        doc.text(invoice.signerTitle, margin, sigY + 26);
      }
    }

    // ATTACHMENTS (if enabled and selected for PDF)
    const pdfAttachments = invoice.attachments.filter((a) => a.includeInPdf);
    if (invoice.customization.showAttachments && pdfAttachments.length > 0) {
      doc.addPage();
      doc.setTextColor(31, 41, 55);
      doc.setFont(baseFont, 'bold');
      doc.setFontSize(16);
      doc.text('Invoice Attachments & Receipts', margin, margin + 20);

      let attY = margin + 40;
      for (const att of pdfAttachments) {
        if (attY + 180 > pageHeight - margin) {
          doc.addPage();
          attY = margin + 20;
        }
        doc.setFontSize(10);
        doc.setFont(baseFont, 'bold');
        doc.setTextColor(75, 85, 99);
        doc.text(att.name, margin, attY);
        attY += 12;

        try {
          doc.addImage(att.dataUrl, 'JPEG', margin, attY, 240, 140, undefined, 'FAST');
          attY += 155;
        } catch {
          attY += 20;
        }
      }
    }

    // Clean filename
    const safeClient = (invoice.toName || 'Client').replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeNum = (invoice.number || '0001').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `Invoice_${safeNum}_${safeClient}.pdf`;

    return { success: true, doc, filename };
  } catch (err: any) {
    console.error('PDF generation error', err);
    return { success: false, error: err?.message || 'Could not generate PDF' };
  }
}

export async function downloadInvoicePdf(invoice: InvoiceData): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await generateInvoicePdf(invoice);
    if (!res.success || !res.doc) {
      return { success: false, error: res.error || 'Failed to generate PDF' };
    }
    res.doc.save(res.filename || 'Invoice.pdf');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Download failed' };
  }
}

export async function printInvoicePdfDirect(invoice: InvoiceData): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await generateInvoicePdf(invoice);
    if (!res.success || !res.doc) {
      return { success: false, error: res.error || 'Failed to generate PDF' };
    }

    // Embed auto-print script into jsPDF
    res.doc.autoPrint();

    // Create a Blob and open direct print in iframe or data url
    const blob = res.doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    // Try hidden iframe print
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    printFrame.src = blobUrl;

    document.body.appendChild(printFrame);

    printFrame.onload = () => {
      setTimeout(() => {
        try {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        } catch (e) {
          console.warn('iframe print blocked, opening in blob popup or fallback', e);
        }
      }, 250);
    };

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Print failed' };
  }
}
