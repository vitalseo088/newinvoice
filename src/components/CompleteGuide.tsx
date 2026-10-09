import React from 'react';
import { PROFESSION_EXAMPLES, ProfessionTemplateExample } from '../data/professionExamples';

interface CompleteGuideProps {
  onLoadExample?: (example: ProfessionTemplateExample) => void;
  onOpenSettings?: () => void;
}

export const CompleteGuide: React.FC<CompleteGuideProps> = ({
  onLoadExample,
}) => {
  return (
    <article
      id="invoiceo-guide"
      className="max-w-4xl mx-auto my-8 sm:my-10 bg-white border border-gray-200/90 rounded-2xl shadow-sm px-5 sm:px-10 md:px-14 py-8 sm:py-12 text-gray-800"
    >
      
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Free Invoice Generator (No Signup, No Watermark): Complete Guide with Examples
      </h1>

      {/* Intro */}
      <p className="mb-4 leading-relaxed text-gray-700">
        Getting paid starts with a clear, professional invoice. Yet many invoice tools make you create an account, limit you to a few invoices a month, or stamp a watermark across the page you send to your client.
      </p>

      <p className="mb-4 leading-relaxed text-gray-700">
        Invoiceo is a free invoice generator online that works differently. There is no login, no registration and no watermark. You fill in a simple form, watch a live preview update, and download a clean, searchable PDF invoice in seconds. Your data is saved in your own browser, so you can come back and edit or reuse invoices later.
      </p>

      <p className="mb-6 leading-relaxed text-gray-700">
        This guide explains what the tool does, walks you through creating your first invoice step by step, and shows ready-to-copy examples for freelancers, consultants, contractors, plumbers, photographers, cleaners and handymen.
      </p>

      {/* In this guide */}
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
        In this guide
      </h2>
      <ul className="list-disc pl-6 mb-8 space-y-1 text-gray-700">
        <li><a href="#what-is-invoiceo" className="text-blue-600 hover:underline">What is Invoiceo?</a></li>
        <li><a href="#key-features" className="text-blue-600 hover:underline">Key features</a></li>
        <li><a href="#how-to-create-an-invoice" className="text-blue-600 hover:underline">How to create an invoice in 7 steps</a></li>
        <li><a href="#choosing-the-right-template" className="text-blue-600 hover:underline">Choosing the right template</a></li>
        <li><a href="#adding-your-logo" className="text-blue-600 hover:underline">Adding your logo</a></li>
        <li><a href="#tax-discounts-and-multiple-currencies" className="text-blue-600 hover:underline">Tax, discounts and multiple currencies</a></li>
        <li><a href="#saving-editing-importing-exporting" className="text-blue-600 hover:underline">Saving, editing, importing and exporting invoices</a></li>
        <li><a href="#example-invoices-by-profession" className="text-blue-600 hover:underline">Example invoices by profession</a></li>
        <li><a href="#receipts-credit-notes-proforma-quotes" className="text-blue-600 hover:underline">Receipts, credit notes, proforma invoices and quotes</a></li>
        <li><a href="#what-every-invoice-should-include" className="text-blue-600 hover:underline">What every invoice should include</a></li>
        <li><a href="#invoice-numbering-made-simple" className="text-blue-600 hover:underline">Invoice numbering made simple</a></li>
        <li><a href="#tips-to-get-paid-faster" className="text-blue-600 hover:underline">Tips to get paid faster</a></li>
        <li><a href="#privacy-data-handling" className="text-blue-600 hover:underline">Privacy: how your data is handled</a></li>
        <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>
      </ul>

      {/* What is Invoiceo? */}
      <h2 id="what-is-invoiceo" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        What is Invoiceo?
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        Invoiceo is a simple invoice generator that runs entirely in your web browser. It is built for people who just want to make an invoice and send it, without learning accounting software.
      </p>
      <p className="mb-2 font-medium text-gray-800">
        It is a good fit if you are:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1.5 text-gray-700">
        <li>A freelancer or independent contractor billing clients by the hour or by the project</li>
        <li>A small business owner who needs a consistent, branded invoice</li>
        <li>A tradesperson such as a plumber, handyman or cleaner who invoices after each job</li>
        <li>A consultant or photographer who bills for services and expenses</li>
        <li>Anyone who needs a quick printable invoice or invoice PDF without paying for a subscription</li>
      </ul>
      <p className="mb-6 leading-relaxed text-gray-700">
        Because there is no signup, you can open the page, create an invoice and be finished in a couple of minutes.
      </p>

      {/* Key features */}
      <h2 id="key-features" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Key features
      </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-3 font-semibold text-gray-900">Feature</th>
              <th className="border border-gray-300 p-3 font-semibold text-gray-900">What it means for you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">No signup / no login</td>
              <td className="border border-gray-300 p-3 text-gray-700">Start immediately. No email, no password, no registration form.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">No watermark</td>
              <td className="border border-gray-300 p-3 text-gray-700">The PDF you download is clean and ready to send to clients.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Free to use</td>
              <td className="border border-gray-300 p-3 text-gray-700">Create and download invoices without a paywall.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Searchable PDF</td>
              <td className="border border-gray-300 p-3 text-gray-700">Text in the PDF can be selected, copied and searched, unlike flat image-based PDFs. This also helps accountants and bookkeeping tools read your invoice.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Live preview</td>
              <td className="border border-gray-300 p-3 text-gray-700">See exactly how the invoice looks while you type.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Multiple templates</td>
              <td className="border border-gray-300 p-3 text-gray-700">Choose from different layouts to match your brand or industry.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Logo upload</td>
              <td className="border border-gray-300 p-3 text-gray-700">Add your company logo so every invoice looks professional.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Tax and discounts</td>
              <td className="border border-gray-300 p-3 text-gray-700">Add tax rates and discounts; totals are calculated automatically.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Multiple currencies</td>
              <td className="border border-gray-300 p-3 text-gray-700">Invoice international clients in the currency they pay in (including PKR, USD, EUR, GBP, and more).</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Custom colors</td>
              <td className="border border-gray-300 p-3 text-gray-700">Match the invoice accent color to your brand.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Saves data in your browser</td>
              <td className="border border-gray-300 p-3 text-gray-700">Your invoices are stored locally so you can reopen, duplicate and edit them.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Import / export</td>
              <td className="border border-gray-300 p-3 text-gray-700">Back up an invoice as a file and load it again later or on another device.</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 font-medium text-gray-900">Editable invoice online</td>
              <td className="border border-gray-300 p-3 text-gray-700">Change any detail at any time and download a fresh PDF.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* How to create an invoice in 7 steps */}
      <h2 id="how-to-create-an-invoice" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        How to create an invoice in 7 steps
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        Follow these steps to make your first invoice with this free invoice maker.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 1: Open the tool</h3>
      <p className="mb-4 leading-relaxed text-gray-700">
        Go to the Invoiceo invoice generator in your browser. It works on desktop, tablet and mobile. You land straight on the invoice form, with no account screen in the way.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 2: Add your business details ("From")</h3>
      <p className="mb-2 leading-relaxed text-gray-700">
        Enter the information your client needs to know who is billing them:
      </p>
      <ul className="list-disc pl-6 mb-2 space-y-1 text-gray-700">
        <li>Business or personal name</li>
        <li>Address</li>
        <li>Email and phone number</li>
        <li>Tax ID, VAT number or business registration number (if applicable)</li>
      </ul>
      <p className="mb-4 leading-relaxed text-gray-700">
        If you are a freelancer without a registered company, your own name and contact details are perfectly fine.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 3: Add your client details ("Bill To")</h3>
      <p className="mb-4 leading-relaxed text-gray-700">
        Enter your client's name or company name, address and email. Accurate client details prevent payment delays, especially when the client's accounts department processes invoices.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 4: Set the invoice number and dates</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
        <li><strong>Invoice number:</strong> a unique reference such as INV-0001</li>
        <li><strong>Invoice date:</strong> the day you issue the invoice</li>
        <li><strong>Due date:</strong> when payment is expected (for example, 7, 14 or 30 days after the invoice date)</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 5: Add line items</h3>
      <p className="mb-2 leading-relaxed text-gray-700">
        Add each product or service on its own line, with:
      </p>
      <ul className="list-disc pl-6 mb-2 space-y-1 text-gray-700">
        <li>Description (be specific: "Logo design – 3 concepts + revisions" is better than "Design")</li>
        <li>Quantity or hours</li>
        <li>Rate or unit price</li>
      </ul>
      <p className="mb-4 leading-relaxed text-gray-700">
        The line total and the invoice subtotal are calculated automatically.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 6: Add tax, discount, notes and payment details</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
        <li>Add a tax rate (VAT, GST, sales tax) if it applies to you</li>
        <li>Add a discount if you are offering one</li>
        <li>Choose your currency</li>
        <li>Write payment instructions: bank details, PayPal email or another payment method</li>
        <li>Add notes or terms, such as late-payment fees or a thank-you message</li>
      </ul>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Step 7: Preview and download your PDF</h3>
      <p className="mb-4 leading-relaxed text-gray-700">
        Check the live preview. If everything looks right, click the Download button to get your invoice PDF. Attach it to an email or send it through your usual channel. Because the PDF is searchable, your client can copy the payment details straight from it.
      </p>
      <p className="mb-6 leading-relaxed text-gray-600 italic">
        Tip: On smaller screens the form and the preview are shown in tabs, so you can switch between editing and checking how the final invoice looks.
      </p>

      {/* Choosing the right template */}
      <h2 id="choosing-the-right-template" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Choosing the right template
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        A good template makes your invoice easy to read in a few seconds. Invoiceo offers a range of layouts so you can pick the style that suits you.
      </p>
      <p className="mb-2 font-medium text-gray-800">
        Choose a template based on what you do:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1.5 text-gray-700">
        <li><strong>Clean and minimal:</strong> ideal for freelancers, consultants and designers who want a modern look</li>
        <li><strong>Classic and structured:</strong> a safe choice for contractors, accountants and traditional businesses</li>
        <li><strong>Bold header or color blocks:</strong> good for agencies, photographers and creative studios</li>
        <li><strong>Compact layouts:</strong> useful for trades and service jobs with only a few line items</li>
      </ul>
      <p className="mb-4 leading-relaxed text-gray-700">
        You can switch templates at any time without retyping anything. Your information stays in place and only the layout changes, so try a few and keep the one you like.
      </p>
      <p className="mb-6 leading-relaxed text-gray-700">
        <strong>Custom colors:</strong> use the customization options to change the accent color so your invoice matches your logo and website.
      </p>

      {/* Adding your logo */}
      <h2 id="adding-your-logo" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Adding your logo
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        A logo makes your invoice look like it came from an established business, and it helps clients recognize you immediately.
      </p>
      <p className="mb-2 font-medium text-gray-800">
        To add a free invoice with your logo:
      </p>
      <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-gray-700">
        <li>Open the logo or branding section of the form.</li>
        <li>Upload your logo image (PNG with a transparent background works best).</li>
        <li>Check the preview. If your logo looks too large or too small, try a different template or a version of the logo with less empty space around it.</li>
      </ol>
      <p className="mb-6 leading-relaxed text-gray-700">
        Your logo is kept when you save the invoice, so you do not need to upload it again each time you create a new one. It is also included in the downloaded PDF at full quality.
      </p>

      {/* Tax, discounts and multiple currencies */}
      <h2 id="tax-discounts-and-multiple-currencies" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Tax, discounts and multiple currencies
      </h2>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Adding tax</h3>
      <p className="mb-4 leading-relaxed text-gray-700">
        Whether you charge VAT, GST, sales tax or another local tax, you can enter the rate and let the tool calculate the amount. This makes it a practical free invoice generator with tax for small businesses that need tax shown clearly on each invoice.
      </p>
      <p className="mb-4 leading-relaxed text-gray-700">
        If you are not registered for tax, simply leave the tax field empty or at zero.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Adding discounts</h3>
      <p className="mb-4 leading-relaxed text-gray-700">
        Offering a loyalty discount or an early-payment incentive? Add a discount and the new total is calculated automatically, so there is no manual maths and no errors.
      </p>

      <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Using multiple currencies</h3>
      <p className="mb-2 leading-relaxed text-gray-700">
        If you work with international clients, you can set the invoice currency to match the country you are billing. For example:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700">
        <li>A freelancer in Pakistan invoicing a UK client in GBP or invoicing locally in PKR (Rs)</li>
        <li>A consultant in the US invoicing a European company in EUR</li>
        <li>A photographer in the Philippines invoicing locally in PHP</li>
      </ul>
      <p className="mb-6 leading-relaxed text-gray-700">
        Always make sure the currency is obvious on the invoice, and confirm with your client which currency they expect to pay in.
      </p>

      {/* Saving, editing, importing and exporting invoices */}
      <h2 id="saving-editing-importing-exporting" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Saving, editing, importing and exporting invoices
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        You do not need an account to keep your work.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li><strong>Autosave in your browser:</strong> your invoice data is stored locally in your browser, so you can close the tab and come back to continue.</li>
        <li><strong>Edit later:</strong> reopen a saved invoice, change anything and download a new PDF.</li>
        <li><strong>Reuse as a template:</strong> duplicate a previous invoice for a repeat client and just change the dates, invoice number and line items.</li>
        <li><strong>Export:</strong> save an invoice as a file to back it up or move it to another device.</li>
        <li><strong>Import:</strong> load a previously exported file to continue where you left off.</li>
      </ul>
      <p className="mb-6 leading-relaxed text-gray-700">
        <strong>Important:</strong> because data is stored in your browser, clearing your browser data or switching browsers or devices will not carry your saved invoices with you. Use the export option to keep a backup of an important invoice.
      </p>

      {/* Example invoices by profession */}
      <h2 id="example-invoices-by-profession" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Example invoices by profession
      </h2>
      <p className="mb-6 leading-relaxed text-gray-700">
        Here are common ways different professionals structure their line items, rates, and terms. You can review these examples or load any of them directly into the invoice generator.
      </p>

      <div className="space-y-6 mb-8">
        {PROFESSION_EXAMPLES.map((ex) => (
          <div key={ex.id} className="pb-6 border-b border-gray-200 last:border-b-0">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-900">
                {ex.profession}: {ex.data.fromName}
              </h3>
              {onLoadExample && (
                <button
                  type="button"
                  onClick={() => {
                    onLoadExample(ex);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                  Load into generator &rarr;
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2 italic">
              {ex.tagline} &middot; Currency: {ex.suggestedCurrency} ({ex.suggestedCurrencySymbol.trim()})
            </p>
            <p className="text-sm font-medium text-gray-800 mb-1">Sample line items:</p>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
              {ex.data.items?.map((it, idx) => (
                <li key={idx}>
                  {it.description} &mdash; {it.quantity} x {ex.suggestedCurrencySymbol}{it.rate.toLocaleString()} = {ex.suggestedCurrencySymbol}{(it.quantity * it.rate).toLocaleString()}
                </li>
              ))}
            </ul>
            {ex.data.notes && (
              <p className="text-xs text-gray-500 mt-2">
                <strong>Notes & terms:</strong> {ex.data.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Receipts, credit notes, proforma invoices and quotes */}
      <h2 id="receipts-credit-notes-proforma-quotes" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Receipts, credit notes, proforma invoices and quotes
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        An invoice is not the only billing document you may need. You can customize the title and fields in Invoiceo to produce other common documents:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li><strong>Quotes and estimates:</strong> Send a quote before starting work so the client can approve the project scope and estimated costs. Once approved, you can convert the same line items into a final invoice.</li>
        <li><strong>Proforma invoices:</strong> A proforma invoice is a preliminary bill sent to a buyer in advance of a delivery of goods or services. It is often requested for customs clearance or advance international wire transfers.</li>
        <li><strong>Receipts:</strong> Once a client has paid, update the invoice status to "Paid", label it as an Official Receipt, and provide it as proof of payment.</li>
        <li><strong>Credit notes:</strong> If a job changes or an overpayment occurs, issue a credit note referencing the original invoice to reduce or cancel the amount due.</li>
      </ul>

      {/* What every invoice should include */}
      <h2 id="what-every-invoice-should-include" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        What every invoice should include
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        To prevent payment delays and avoid confusion with your client's accounts department, make sure every invoice contains:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-1.5 text-gray-700">
        <li><strong>Clear heading:</strong> The word "INVOICE" at the top of the page so it is instantly recognized.</li>
        <li><strong>Your business details:</strong> Name, trading name, address, email, phone number, and tax registration number.</li>
        <li><strong>Client details:</strong> Client or company name, contact person, and billing address.</li>
        <li><strong>Dates:</strong> The invoice issuance date and the clear payment due date.</li>
        <li><strong>Unique invoice number:</strong> A sequential reference number for tracking and accounting records.</li>
        <li><strong>Itemized breakdown:</strong> Clear description of each service or product, quantity, unit rate, and line total.</li>
        <li><strong>Taxes and discounts:</strong> Clearly separated VAT/tax percentages and promotional deductions.</li>
        <li><strong>Total amount due:</strong> The final balance due prominently displayed with the currency symbol.</li>
        <li><strong>Payment terms and instructions:</strong> How to pay (bank transfer details, IBAN, account number, Raast ID, PayPal, or card link).</li>
      </ul>

      {/* Invoice numbering made simple */}
      <h2 id="invoice-numbering-made-simple" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Invoice numbering made simple
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        Tax authorities and accountants require invoices to have unique, sequential numbering. Avoid random numbers and pick one simple format:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li><strong>Sequential numbers (e.g. INV-0001, INV-0002):</strong> The simplest approach, great for freelancers and independent contractors. Adding leading zeros ensures files sort properly.</li>
        <li><strong>Year-based numbers (e.g. 2026-001, 2026-002):</strong> Resets every year and makes it easy to see when an invoice was issued.</li>
        <li><strong>Client-based numbers (e.g. ACME-001, GOOG-001):</strong> Helpful if you want to track total projects issued per customer.</li>
      </ul>
      <p className="mb-6 leading-relaxed text-gray-700">
        Whichever convention you choose, never reuse an invoice number, even if an invoice was cancelled.
      </p>

      {/* Tips to get paid faster */}
      <h2 id="tips-to-get-paid-faster" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Tips to get paid faster
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        Waiting for unpaid invoices can harm your cash flow. Follow these proven tips to reduce payment delays:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li><strong>Send the invoice immediately:</strong> Don't wait until the end of the month. Issue the invoice as soon as the project milestone is reached.</li>
        <li><strong>Use shorter payment terms:</strong> Offer 7 or 14-day terms instead of default 30-day terms for small or milestone-based projects.</li>
        <li><strong>Provide exact bank details:</strong> Because Invoiceo creates searchable PDFs, clients can copy and paste your bank IBAN, routing code, or PayPal ID without transcription errors.</li>
        <li><strong>Be specific in item descriptions:</strong> Itemized details prevent back-and-forth emails asking what each charge is for.</li>
        <li><strong>Follow up politely:</strong> Send a quick reminder three days before the due date, and immediately follow up on the due date if payment has not arrived.</li>
      </ul>

      {/* Privacy: how your data is handled */}
      <h2 id="privacy-data-handling" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Privacy: how your data is handled
      </h2>
      <p className="mb-4 leading-relaxed text-gray-700">
        Invoiceo is built with privacy by design:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li><strong>Runs entirely in your browser:</strong> Your client records, invoice items, and financial amounts are computed directly on your device.</li>
        <li><strong>No server database:</strong> Your financial data is not transmitted to or stored on external servers or cloud accounts.</li>
        <li><strong>Local storage:</strong> Saved invoices reside in your browser's local memory. You have complete control and can export or wipe your data anytime.</li>
      </ul>

      {/* FAQ */}
      <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-10 mb-3">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Is Invoiceo really free to use?</h3>
          <p className="text-gray-700 leading-relaxed">
            Yes, completely free. There are no subscriptions, no monthly limits, and no hidden fees for downloading or printing invoices.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-1">Does the PDF invoice have a watermark?</h3>
          <p className="text-gray-700 leading-relaxed">
            No. The downloaded PDF invoice is 100% clean and free of watermarks or third-party ads, making it fully professional to send to clients.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-1">Do I need to sign up or create an account?</h3>
          <p className="text-gray-700 leading-relaxed">
            No registration or login is required. You can start creating your invoice immediately upon opening the page.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-1">Can I add my logo and digital signature?</h3>
          <p className="text-gray-700 leading-relaxed">
            Yes. You can upload your business logo (PNG, JPG, or SVG) and sign using your mouse, trackpad, or touchscreen using the digital signature pad.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-1">Which currencies are supported?</h3>
          <p className="text-gray-700 leading-relaxed">
            Invoiceo supports Pakistani Rupee (PKR - Rs), US Dollar (USD - $), Euro (EUR - €), British Pound (GBP - £), Canadian Dollar, Australian Dollar, UAE Dirham, Saudi Riyal, and other global currencies.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-1">Can I calculate taxes and discounts?</h3>
          <p className="text-gray-700 leading-relaxed">
            Yes. You can specify VAT, GST, or local sales tax rates as well as percentage or flat-rate discounts. Totals are calculated automatically.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-1">What happens if I clear my browser history?</h3>
          <p className="text-gray-700 leading-relaxed">
            Because invoices are stored in your browser's local memory, clearing your browser cache or switching devices will remove stored drafts. We recommend using the "Export Backup" button to save a copy of important invoices to your computer.
          </p>
        </div>
      </div>

    </article>
  );
};
