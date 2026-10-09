import { InvoiceData } from '../types/invoice';
import { getDefaultInvoice } from '../utils/storage';

export interface ToolConfig {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  documentTitle: string;
  numberPrefix: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  badgeText: string;
  category: 'Billing' | 'Sales & Quotes' | 'Operations & Fulfillment' | 'Time & Contracting';
  getDefaultData: () => InvoiceData;
}

const today = new Date().toISOString().split('T')[0];
const in30Days = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
})();

export const TOOLS_CONFIG: ToolConfig[] = [
  {
    id: 'invoice-generator',
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    shortName: 'Invoice',
    documentTitle: 'INVOICE',
    numberPrefix: 'INV-',
    h1: 'Invoice Generator',
    metaTitle: 'Free Invoice Generator - Create & Download PDF Invoices | Invoiceo.online',
    metaDescription: '100% free professional invoice generator. Create, customize, autosave, and download high-quality searchable PDF invoices without signup or login.',
    description: 'Create clean, professional invoices in seconds with Invoiceo, the 100% free online invoice generator trusted by freelancers, contractors, and small business owners worldwide. There is no signup required, no subscription fees, and absolutely no watermarks. Easily customize line items, taxes, discounts, and international currencies with live preview, then download print-ready, searchable PDF invoices instantly. Your sensitive billing data stays private and secure in your browser, helping you bill clients effortlessly and get paid on time.',
    badgeText: 'Instant Searchable PDF',
    category: 'Billing',
    getDefaultData: () => getDefaultInvoice(),
  },
  {
    id: 'receipt-generator',
    slug: 'receipt-generator',
    name: 'Receipt Generator',
    shortName: 'Receipt',
    documentTitle: 'PAYMENT RECEIPT',
    numberPrefix: 'REC-',
    h1: 'Receipt Generator',
    metaTitle: 'Free Receipt Generator - Create & Download Payment Receipts | Invoiceo.online',
    metaDescription: 'Free online payment receipt generator. Issue professional payment receipts with proof of payment, transaction IDs, tax calculations, and instant PDF download.',
    description: 'Generate official payment receipts in seconds with our free online receipt generator. Perfect for small businesses, contractors, landlords, and service providers who need to issue professional, tamper-free proof of payment. Easily itemize paid goods or services, taxes, transaction IDs, and payment methods with instant live preview and high-resolution PDF download. No account or subscription required.',
    badgeText: 'Proof of Payment',
    category: 'Billing',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'rec_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'PAYMENT RECEIPT',
        number: 'REC-0001',
        paymentTerms: 'on_receipt',
        amountPaid: 3575, // Matches subtotal/total
        notes: 'Payment received in full. Thank you for your prompt business! An electronic record of this payment receipt has been issued for your accounting files.',
        paymentDetails: `Payment Method: Corporate Credit Card (Visa ending in 4022)\nTransaction Auth: AUTH-882194\nReceipt Status: PAID IN FULL\nPayment Cleared: ${today}`,
        customFields: [
          { id: 'cf_1', label: 'Payment Status', value: 'PAID IN FULL' },
          { id: 'cf_2', label: 'Transaction ID', value: 'TXN-902184' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Brand Identity & Visual System Package',
            details: 'Complete visual identity overhaul, logo marks, typography guide, and digital assets',
            quantity: 1,
            rate: 2850,
          },
          {
            id: 'item_2',
            description: 'Cloud Infrastructure Setup & DNS Security',
            details: 'Production container setup, CI/CD pipeline, and DNS SSL routing configuration',
            quantity: 1,
            rate: 725,
          },
        ],
      };
    },
  },
  {
    id: 'quote-generator',
    slug: 'quote-generator',
    name: 'Quote Generator',
    shortName: 'Quote',
    documentTitle: 'PRICE QUOTE',
    numberPrefix: 'QUO-',
    h1: 'Quote Generator',
    metaTitle: 'Free Quote Generator - Create Professional Price Quotes Online | Invoiceo.online',
    metaDescription: 'Free online price quote generator for freelancers and contractors. Create itemized quotes, terms of validity, scope details, and download clean PDF quotes.',
    description: 'Create polished, competitive price quotes for prospective clients in seconds. Send transparent cost estimates with itemized services, material breakdowns, validity timelines, and clear acceptance terms. Download print-ready PDF quotes with zero watermarks or subscription fees, helping your business win more bids and establish credibility before starting work.',
    badgeText: 'Client Price Proposal',
    category: 'Sales & Quotes',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'quo_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'PRICE QUOTE',
        number: 'QUO-0001',
        amountPaid: 0,
        notes: 'This quotation is valid for 30 calendar days from the date of issue. To approve this proposal and schedule commencement of work, please sign and return a copy of this quote.',
        paymentDetails: 'Proposed Payment Milestones:\n- 40% Advance deposit upon contract signing\n- 40% Upon milestone alpha review\n- 20% Upon final production deployment',
        customFields: [
          { id: 'cf_1', label: 'Quote Validity', value: '30 Calendar Days' },
          { id: 'cf_2', label: 'Estimated Start', value: 'Within 5 business days of approval' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Full-Stack Web Application Architecture',
            details: 'Next.js / React interactive dashboard frontend with RESTful backend integration',
            quantity: 1,
            rate: 4500,
          },
          {
            id: 'item_2',
            description: 'UX Research & Interactive Wireframes',
            details: 'User journey mapping, high-fidelity clickable Figma prototypes, and developer specs',
            quantity: 1,
            rate: 1800,
          },
          {
            id: 'item_3',
            description: 'Automated Test Suite & QA Verification',
            details: 'End-to-end integration test coverage, accessibility audit, and cross-browser testing',
            quantity: 1,
            rate: 950,
          },
        ],
      };
    },
  },
  {
    id: 'estimate-generator',
    slug: 'estimate-generator',
    name: 'Estimate Generator',
    shortName: 'Estimate',
    documentTitle: 'PROJECT ESTIMATE',
    numberPrefix: 'EST-',
    h1: 'Estimate Generator',
    metaTitle: 'Free Estimate Generator - Create Cost Estimates Online | Invoiceo.online',
    metaDescription: 'Free project estimate generator for contractors, trades, and creative professionals. Itemize projected labor, materials, and contingencies into professional PDFs.',
    description: 'Draft accurate, professional cost estimates for construction, remodeling, creative projects, and technical services. Itemize projected labor hours, materials, permits, and contingencies with transparent pricing. Generate polished PDF estimates that reassure clients and establish clear budget expectations from day one, completely free without signup.',
    badgeText: 'Project Cost Estimator',
    category: 'Sales & Quotes',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'est_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'PROJECT ESTIMATE',
        number: 'EST-0001',
        amountPaid: 0,
        notes: 'This document represents a good-faith cost estimate based on initial specifications. Final billing may adjust based on actual hours and material requirements verified upon project completion.',
        paymentDetails: 'Estimated Billing Schedule:\n- 30% Mobilization deposit\n- 40% Mid-project progress billing\n- 30% Balance upon final acceptance',
        customFields: [
          { id: 'cf_1', label: 'Project Scope', value: 'Phase 1 Core Architecture' },
          { id: 'cf_2', label: 'Contingency Factor', value: '± 5% on unforeseen labor' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Project Discovery & Technical Blueprint',
            details: 'System architecture design, schema models, and security threat modeling',
            quantity: 20,
            rate: 120,
          },
          {
            id: 'item_2',
            description: 'Core Engineering & API Implementation',
            details: 'Estimated developer sprints for core business logic and database migrations',
            quantity: 60,
            rate: 95,
          },
          {
            id: 'item_3',
            description: 'DevOps & High-Availability Server Setup',
            details: 'Container orchestration, load balancing, automated backups, and SSL certs',
            quantity: 12,
            rate: 110,
          },
        ],
      };
    },
  },
  {
    id: 'credit-note-generator',
    slug: 'credit-note-generator',
    name: 'Credit Note Generator',
    shortName: 'Credit Note',
    documentTitle: 'CREDIT NOTE',
    numberPrefix: 'CN-',
    h1: 'Credit Note Generator',
    metaTitle: 'Free Credit Note Generator - Issue Credit Memos & Refunds | Invoiceo.online',
    metaDescription: 'Free online credit note generator. Issue compliant credit memos, refunds, billing corrections, and balance adjustments with original invoice references in PDF.',
    description: 'Issue compliant credit notes and credit memos quickly and accurately for returned goods, billing corrections, discounts, or account refunds. Maintain clean accounting records with original invoice cross-references, itemized adjustments, and clear client credit balances. Download print-ready, professional PDF credit notes in your browser with zero hassle.',
    badgeText: 'Accounting Adjustment',
    category: 'Billing',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'cn_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'CREDIT NOTE',
        number: 'CN-0001',
        amountPaid: 0,
        notes: 'Credit note issued against original invoice INV-2026-084. This credit balance can be applied toward future invoices or refunded via original payment method upon written request.',
        paymentDetails: 'Credit Application:\nOriginal Invoice: INV-2026-084\nAdjustment Reason: Return of surplus software licenses & billing rate adjustment',
        customFields: [
          { id: 'cf_1', label: 'Original Invoice Ref', value: 'INV-2026-084' },
          { id: 'cf_2', label: 'Adjustment Reason', value: 'Scope Adjustment & Return' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Credit: Return of 5 Dedicated Server Licenses',
            details: 'Unused cloud compute allocation credited back to customer account for Q3 billing',
            quantity: 5,
            rate: 180,
          },
          {
            id: 'item_2',
            description: 'Credit: Service Level Agreement (SLA) Rebate',
            details: 'Agreed rebate for scheduled maintenance window exceeding planned downtime',
            quantity: 1,
            rate: 350,
          },
        ],
      };
    },
  },
  {
    id: 'purchase-order-generator',
    slug: 'purchase-order-generator',
    name: 'Purchase Order Generator',
    shortName: 'Purchase Order',
    documentTitle: 'PURCHASE ORDER',
    numberPrefix: 'PO-',
    h1: 'Purchase Order Generator',
    metaTitle: 'Free Purchase Order Generator - Create POs Online | Invoiceo.online',
    metaDescription: 'Free purchase order (PO) generator for procurement and inventory. Itemize ordered products, quantities, supplier details, delivery dates, and authorized signatures.',
    description: 'Generate legally binding purchase orders (PO) to vendors and suppliers in seconds. Itemize ordered quantities, unit costs, delivery dates, shipping instructions, and authorized purchasing signatures. Streamline procurement and inventory tracking completely free in your browser with instant searchable PDF exports and zero watermarks.',
    badgeText: 'Vendor Procurement',
    category: 'Operations & Fulfillment',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'po_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'PURCHASE ORDER',
        number: 'PO-0001',
        poNumber: 'PO-0001',
        amountPaid: 0,
        notes: 'Please supply the items listed above in accordance with our standard procurement terms. Ensure this Purchase Order number appears on all packing slips, invoices, and shipment cartons.',
        paymentDetails: 'Payment Terms: Net 30 Days upon delivery and inspection of goods\nShip Via: Ground Freight Insured\nF.O.B.: Destination Receiving Dock',
        customFields: [
          { id: 'cf_1', label: 'Delivery Location', value: 'Dock 3, Central Logistics Hub' },
          { id: 'cf_2', label: 'Required Delivery Date', value: in30Days },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Ergonomic Mesh Task Chairs (Model HC-40)',
            details: 'High-back mesh with adjustable lumbar support, black frame, reinforced casters',
            quantity: 15,
            rate: 220,
          },
          {
            id: 'item_2',
            description: 'UltraSharp 27-inch 4K USB-C Displays',
            details: 'IPS panel, 99% sRGB color gamut, integrated 90W power delivery hub',
            quantity: 10,
            rate: 420,
          },
          {
            id: 'item_3',
            description: 'Motorized Dual-Motor Standing Desk Frames',
            details: 'Electric height adjustable 28-48 inch range with memory keypad',
            quantity: 8,
            rate: 310,
          },
        ],
      };
    },
  },
  {
    id: 'sales-order-generator',
    slug: 'sales-order-generator',
    name: 'Sales Order Generator',
    shortName: 'Sales Order',
    documentTitle: 'SALES ORDER',
    numberPrefix: 'SO-',
    h1: 'Sales Order Generator',
    metaTitle: 'Free Sales Order Generator - Create Sales Orders Online | Invoiceo.online',
    metaDescription: 'Free online sales order generator. Confirm customer orders prior to manufacturing and dispatch with itemized quantities, unit prices, and delivery terms.',
    description: 'Create official sales orders to confirm customer purchases prior to manufacturing, packaging, or dispatch. Itemize ordered products, agreed unit prices, shipping instructions, and delivery schedules to prevent order disputes and establish clear sales confirmations. Export print-ready PDF sales orders effortlessly.',
    badgeText: 'Order Confirmation',
    category: 'Sales & Quotes',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'so_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'SALES ORDER',
        number: 'SO-0001',
        amountPaid: 0,
        notes: 'Sales order confirmed and scheduled for fulfillment. Fulfillment commences upon verified deposit. Estimated delivery window: 7-10 business days.',
        paymentDetails: 'Payment Terms: 50% Advance deposit, 50% upon shipment notice\nPreferred Carrier: Express Courier\nTracking will be emailed upon dispatch.',
        customFields: [
          { id: 'cf_1', label: 'Order Status', value: 'Confirmed & Processing' },
          { id: 'cf_2', label: 'Est. Dispatch Date', value: in30Days },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Enterprise Cloud SaaS License (Annual Subscription)',
            details: 'Includes up to 50 active seats, advanced analytics dashboard, and priority SLA',
            quantity: 1,
            rate: 5400,
          },
          {
            id: 'item_2',
            description: 'Onboarding, Setup & Team Migration Package',
            details: 'Dedicated solutions engineer assistance, data migration, and 4 staff training webinars',
            quantity: 1,
            rate: 1500,
          },
        ],
      };
    },
  },
  {
    id: 'proforma-invoice-generator',
    slug: 'proforma-invoice-generator',
    name: 'Proforma Invoice Generator',
    shortName: 'Proforma Invoice',
    documentTitle: 'PROFORMA INVOICE',
    numberPrefix: 'PI-',
    h1: 'Proforma Invoice Generator',
    metaTitle: 'Free Proforma Invoice Generator - Customs & Export Billing | Invoiceo.online',
    metaDescription: 'Free proforma invoice generator for international trade, customs clearance, and import verification. Create clean proforma invoices with Incoterms and HS codes.',
    description: 'Create commercial proforma invoices for international trade, customs clearance, letters of credit, and advance customer approvals. Itemize goods, declared commercial values, weights, and Incoterms without binding fiscal tax obligations until final delivery. Download high-resolution PDF proforma invoices in seconds.',
    badgeText: 'Export & Customs',
    category: 'Operations & Fulfillment',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'pi_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'PROFORMA INVOICE',
        number: 'PI-0001',
        amountPaid: 0,
        notes: 'Commercial Proforma Invoice issued for customs clearance, currency transfer authorization, and import licensing. This is not a tax invoice and does not constitute a formal demand for payment.',
        paymentDetails: 'International Wire Transfer Details:\nBeneficiary: Acme Global Exports LLC\nIBAN: US92BOFA12345678901234\nSWIFT / BIC: BOFAUS3N\nCurrency: USD ($)',
        customFields: [
          { id: 'cf_1', label: 'Incoterms 2020', value: 'CIF (Cost, Insurance & Freight)' },
          { id: 'cf_2', label: 'Country of Origin', value: 'United States' },
          { id: 'cf_3', label: 'HS Tariff Code', value: '8471.50.0150' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Industrial Embedded Controllers (Model IC-900)',
            details: 'Dual-core ARM Cortex processor, fanless aluminum chassis, DIN-rail mounting',
            quantity: 12,
            rate: 480,
          },
          {
            id: 'item_2',
            description: 'International Air Freight & Marine Cargo Insurance',
            details: 'Priority door-to-airport freight with comprehensive marine cargo insurance',
            quantity: 1,
            rate: 650,
          },
          {
            id: 'item_3',
            description: 'Export Documentation & Consular Legalization',
            details: 'Certificate of Origin, export inspection certification, and handling fee',
            quantity: 1,
            rate: 220,
          },
        ],
      };
    },
  },
  {
    id: 'timesheet-generator',
    slug: 'timesheet-generator',
    name: 'Timesheet Generator',
    shortName: 'Timesheet',
    documentTitle: 'HOURLY TIMESHEET',
    numberPrefix: 'TS-',
    h1: 'Timesheet Generator',
    metaTitle: 'Free Timesheet Generator - Billable Hours & Contractor Logs | Invoiceo.online',
    metaDescription: 'Free online timesheet generator for freelancers, contractors, and consultants. Log daily hours, tasks, hourly rates, and sprint totals into clean PDF timesheets.',
    description: 'Generate hourly timesheets and billable hour invoices for freelancers, contractors, and remote consultants. Log daily tasks, project milestones, billable hours, and hourly rates with automatic subtotal calculations. Download clean, print-ready timesheet PDFs with your client billing records, completely free.',
    badgeText: 'Billable Hours & Logs',
    category: 'Time & Contracting',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'ts_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'HOURLY TIMESHEET',
        number: 'TS-0001',
        amountPaid: 0,
        notes: 'All billable hours logged above have been tracked in accordance with project sprint milestones. Timesheet verified and approved by technical lead for bi-weekly disbursement.',
        paymentDetails: 'Direct Deposit / Wire Info:\nBank: Silicon Valley Bank\nAccount: 4892019401\nRouting: 121140399',
        customFields: [
          { id: 'cf_1', label: 'Contractor ID', value: 'CON-88412' },
          { id: 'cf_2', label: 'Pay Period', value: 'Current Bi-Weekly Sprint' },
          { id: 'cf_3', label: 'Total Hours', value: '40.0 Billable Hours' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Monday: Database Schema Refactor & Index Optimization',
            details: 'PostgreSQL query optimization, schema migration scripts, and Redis caching setup',
            quantity: 8,
            rate: 95,
          },
          {
            id: 'item_2',
            description: 'Tuesday: REST API Endpoints & Auth Middleware',
            details: 'JWT session rotation, rate limiting middleware, and OpenAPI 3.0 documentation',
            quantity: 8,
            rate: 95,
          },
          {
            id: 'item_3',
            description: 'Wednesday: Frontend Dashboard State & React Components',
            details: 'State management integration, responsive data tables, and chart metrics widgets',
            quantity: 8,
            rate: 95,
          },
          {
            id: 'item_4',
            description: 'Thursday: End-to-End Automated Testing & Code Review',
            details: 'Playwright test scenarios, Jest unit test coverage, and pull request reviews',
            quantity: 8,
            rate: 95,
          },
          {
            id: 'item_5',
            description: 'Friday: Staging Deploy, Load Testing & Sprint Demo',
            details: 'Staging environment rollout, load testing with k6, and team stakeholder demo',
            quantity: 8,
            rate: 95,
          },
        ],
      };
    },
  },
  {
    id: 'work-order-generator',
    slug: 'work-order-generator',
    name: 'Work Order Generator',
    shortName: 'Work Order',
    documentTitle: 'WORK ORDER',
    numberPrefix: 'WO-',
    h1: 'Work Order Generator',
    metaTitle: 'Free Work Order Generator - Service Orders & Field Work | Invoiceo.online',
    metaDescription: 'Free work order generator for HVAC, electrical, plumbing, auto, and maintenance. Create detailed service orders with labor, materials, and customer sign-off.',
    description: 'Create detailed work orders for maintenance, field repairs, HVAC, electrical, plumbing, IT support, and contracting jobs. Itemize job location, authorized service tasks, technician notes, required materials, and customer sign-off authorization. Download professional PDF work orders instantly without signup.',
    badgeText: 'Field Service & Repairs',
    category: 'Operations & Fulfillment',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'wo_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'WORK ORDER',
        number: 'WO-0001',
        amountPaid: 0,
        notes: 'All requested service tasks completed in full compliance with municipal building codes and safety regulations. Customer signature certifies that work was completed satisfactorily.',
        paymentDetails: 'Billing & Payment Terms:\n- Parts & labor billed upon job completion\n- Net 15 days from work order sign-off\n- All repairs include a 90-day workmanship warranty',
        customFields: [
          { id: 'cf_1', label: 'Job Site', value: '450 Commercial Way, Suite 200' },
          { id: 'cf_2', label: 'Lead Technician', value: 'Marcus Vance (Certified Tech)' },
          { id: 'cf_3', label: 'Priority', value: 'Standard Maintenance' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'HVAC Rooftop Unit Seasonal Inspection & Service',
            details: 'Full diagnostic inspection, motor amp draw test, belt tensioning, and coil cleaning',
            quantity: 1,
            rate: 380,
          },
          {
            id: 'item_2',
            description: 'Refrigerant Charge & System Leak Seal (R-410A)',
            details: 'Recharged 4 lbs of virgin R-410A refrigerant and added fluorescent UV leak detector',
            quantity: 4,
            rate: 85,
          },
          {
            id: 'item_3',
            description: 'Commercial MERV 13 Air Filter Replacements',
            details: 'Replaced 6 high-efficiency particulate air filtration cartridges across air handlers',
            quantity: 6,
            rate: 35,
          },
          {
            id: 'item_4',
            description: 'Digital Programmable Thermostat Calibration',
            details: 'Multi-stage heat pump calibration and BACnet building management system hookup',
            quantity: 2,
            rate: 95,
          },
        ],
      };
    },
  },
  {
    id: 'account-statement-generator',
    slug: 'account-statement-generator',
    name: 'Account Statement Generator',
    shortName: 'Account Statement',
    documentTitle: 'STATEMENT OF ACCOUNT',
    numberPrefix: 'SOA-',
    h1: 'Account Statement Generator',
    metaTitle: 'Free Account Statement Generator - Client Billing Ledger | Invoiceo.online',
    metaDescription: 'Free statement of account generator. Summarize client invoices, payments, credits, and outstanding balances into clear monthly accounting statement PDFs.',
    description: 'Generate clear client account statements summarizing billing activity, outstanding invoices, payments received, and current balances due. Keep clients informed and collect overdue balances faster with professional monthly statement PDFs. No account required, completely free with instant PDF export.',
    badgeText: 'Client Ledger Summary',
    category: 'Billing',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'soa_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'STATEMENT OF ACCOUNT',
        number: 'SOA-0001',
        amountPaid: 2500,
        notes: 'Please review your statement of account for the current billing cycle. If you have already remitted payment for outstanding invoices, please accept our thanks and disregard this reminder.',
        paymentDetails: 'Remittance Instructions:\nPayable to: Acme Creative Studio LLC\nACH Routing: 121000358\nAccount: 9876543210\nPlease reference Statement #SOA-0001 with your remittance.',
        customFields: [
          { id: 'cf_1', label: 'Statement Period', value: 'Monthly Summary' },
          { id: 'cf_2', label: 'Account Standing', value: 'Active / Pending Balance' },
        ],
        items: [
          {
            id: 'item_1',
            description: 'Invoice #INV-1021: Visual Identity Design Package',
            details: 'Billed on 1st of month — Original amount $2,850.00 (Due)',
            quantity: 1,
            rate: 2850,
          },
          {
            id: 'item_2',
            description: 'Invoice #INV-1035: Monthly Cloud Maintenance Retainer',
            details: 'Billed on 15th of month — DevOps & uptime monitoring retainer',
            quantity: 1,
            rate: 950,
          },
          {
            id: 'item_3',
            description: 'Invoice #INV-1048: Mobile App UI/UX Prototyping',
            details: 'Billed on 25th of month — Interactive wireframes and developer assets',
            quantity: 1,
            rate: 1400,
          },
        ],
      };
    },
  },
  {
    id: 'packing-slip-generator',
    slug: 'packing-slip-generator',
    name: 'Packing Slip Generator',
    shortName: 'Packing Slip',
    documentTitle: 'PACKING SLIP',
    numberPrefix: 'PS-',
    h1: 'Packing Slip Generator',
    metaTitle: 'Free Packing Slip Generator - Create Shipping Manifests Online | Invoiceo.online',
    metaDescription: 'Free packing slip generator for ecommerce and shipping. Create itemized packing lists with SKUs, box counts, quantities, and carrier tracking into PDF.',
    description: 'Generate printable packing slips and shipping manifests to accompany outgoing customer parcels, pallets, and freight shipments. List item SKUs, descriptions, quantities shipped, box counts, and recipient shipping addresses without showing pricing or with price details. Download clean PDF packing slips in seconds.',
    badgeText: 'Shipping & Package Manifest',
    category: 'Operations & Fulfillment',
    getDefaultData: () => {
      const base = getDefaultInvoice();
      return {
        ...base,
        id: 'ps_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7),
        title: 'PACKING SLIP',
        number: 'PS-0001',
        amountPaid: 0,
        notes: 'Please inspect all parcels and contents immediately upon delivery. Any damaged or missing items must be reported to the carrier and shipper within 48 hours of delivery.',
        paymentDetails: 'Shipping Verification:\nPacked By: Warehouse Station 4\nInspected By: Quality Assurance Lead #12\nPackage Weight: 14.5 lbs',
        customFields: [
          { id: 'cf_1', label: 'Carrier', value: 'FedEx Express 2-Day' },
          { id: 'cf_2', label: 'Tracking #', value: '7894 1234 5678' },
          { id: 'cf_3', label: 'Box Count', value: '1 of 1 Box' },
        ],
        customization: {
          ...base.customization,
          showAmountPaid: false,
          taxRate: 0,
        },
        items: [
          {
            id: 'item_1',
            description: 'SKU #AUD-402: Wireless Noise-Cancelling Headphones (Midnight Black)',
            details: 'Includes USB-C braided charging cable, 3.5mm audio cord, and hard travel shell',
            quantity: 5,
            rate: 199,
          },
          {
            id: 'item_2',
            description: 'SKU #ACC-108: Aluminum Desktop Headphone Stand (Matte Finish)',
            details: 'Weighted non-slip silicone base with integrated cable management groove',
            quantity: 5,
            rate: 35,
          },
          {
            id: 'item_3',
            description: 'SKU #CBL-904: Premium Braided USB-C to USB-C Fast Charging Cable (2m)',
            details: '100W PD charging support, reinforced nylon weave, durable aluminum connectors',
            quantity: 10,
            rate: 18,
          },
        ],
      };
    },
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  const clean = slug.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!clean || clean === 'invoice-generator') {
    return TOOLS_CONFIG[0];
  }
  return TOOLS_CONFIG.find((t) => t.slug === clean);
}

export function getToolById(id: string): ToolConfig | undefined {
  return TOOLS_CONFIG.find((t) => t.id === id);
}
