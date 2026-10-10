import { ToolGuideData, TOOL_GUIDES } from './toolGuidesData';

export const LOCALIZED_TOOL_GUIDES: Record<string, Record<string, Partial<ToolGuideData>>> = {
  // Spanish guides
  es: {
    'invoice-generator': {
      h1: 'Generador de Facturas Gratis en PDF (Sin Registro, Sin Marcas de Agua): Guía Completa',
      introParagraphs: [
        'Cobrar puntualmente empieza con una factura clara, profesional y conforme a la normativa. Sin embargo, muchas herramientas online obligan a crear una cuenta, limitan el número de facturas mensuales o estampan marcas de agua molestas en el documento final.',
        'Invoiceo funciona de manera 100% gratuita y privada directamente en tu navegador. Sin suscripciones, sin registros y sin marcas de agua. Rellenas los campos, ves la vista previa en tiempo real y descargas tu factura en PDF de alta calidad en segundos. Los datos quedan guardados en tu propio dispositivo para reutilizarlos cuando quieras.',
        'Esta guía completa te explica los requisitos legales indispensables en una factura, consejos para acelerar los cobros y ejemplos prácticos para autónomos, profesionales y pymes.',
      ],
      tableOfContents: [
        { id: 'what-is-invoice-generator', label: '¿Qué es el Generador de Facturas?' },
        { id: 'key-features', label: 'Características Principales' },
        { id: 'how-to-create-an-invoice', label: 'Cómo Crear una Factura en 7 Pasos' },
        { id: 'choosing-the-right-template', label: 'Cómo Elegir la Plantilla Adecuada' },
        { id: 'receipts-credit-notes-proforma-quotes', label: 'Recibos, Presupuestos y Notas de Crédito' },
        { id: 'what-every-invoice-should-include', label: 'Elementos Esenciales de una Factura' },
        { id: 'invoice-numbering-made-simple', label: 'Numeración de Facturas' },
        { id: 'tips-to-get-paid-faster', label: 'Consejos para Cobrar Más Rápido' },
        { id: 'privacy-data-handling', label: 'Privacidad y Manejo de Datos' },
        { id: 'faq', label: 'Preguntas Frecuentes (FAQ)' },
      ],
      whatIsTitle: '¿Qué es Invoiceo y cómo funciona?',
      whatIsDescription:
        'Invoiceo es una suite de facturación y generación de documentos comerciales en línea diseñada para profesionales que valoran la rapidez, la sencillez y la privacidad.',
      goodFitList: [
        'Autónomos y freelancers que necesitan facturar servicios digitales de forma inmediata',
        'Profesionales del sector técnico, reformas y oficios que cobran proyectos y anticipos',
        'Pequeñas empresas y negocios que buscan evitar costes mensuales de programas de facturación complejos',
        'Cualquier persona que necesite un comprobante o factura formal sin comprometer su privacidad',
      ],
      featuresTable: [
        { feature: 'Sin Registro ni Cuenta', benefit: 'Abre la herramienta y emite facturas al instante sin crear contraseñas.' },
        { feature: 'Cero Marcas de Agua', benefit: 'Exporta PDFs limpios y profesionales listos para enviar a tus clientes.' },
        { feature: 'PDF Vectorial Buscable', benefit: 'Los clientes y gestores pueden copiar importes, fechas y números de factura.' },
        { feature: 'Cálculo Automático', benefit: 'Impuestos, descuentos y subtotales se calculan al vuelo sin errores matemáticos.' },
        { feature: 'Múltiples Monedas', benefit: 'Factura en Euros (€), Dólares ($), Libras (£) y más de 40 divisas internacionales.' },
        { feature: 'Privacidad Total', benefit: 'Tus datos de facturación se quedan seguros en la memoria de tu navegador.' },
      ],
      stepsTitle: 'Cómo Crear una Factura Profesional en 7 Pasos',
      steps: [
        { title: 'Paso 1: Abrir el Generador', description: 'Accede a la herramienta desde cualquier ordenador, tablet o teléfono móvil sin descargas.' },
        { title: 'Paso 2: Datos del Emisor (De)', description: 'Introduce el nombre de tu negocio, dirección fiscal, correo electrónico, teléfono y NIF/CIF.' },
        { title: 'Paso 3: Datos del Cliente (Facturar a)', description: 'Añade el nombre de la empresa cliente, persona de contacto y dirección de facturación.' },
        { title: 'Paso 4: Fechas y Número de Factura', description: 'Establece la fecha de emisión, fecha de vencimiento y un número de factura correlativo.' },
        { title: 'Paso 5: Añadir Conceptos y Líneas', description: 'Detalla cada servicio o producto, cantidad, precio unitario y tipo de IVA o descuento aplicable.' },
        { title: 'Paso 6: Instrucciones de Pago y Notas', description: 'Indica tu número de cuenta bancaria, IBAN, instrucciones SEPA o pasarela de pago.' },
        { title: 'Paso 7: Descargar PDF', description: 'Comprueba la vista previa en tiempo real y descarga tu factura en PDF de alta calidad.' },
      ],
      templatesSection: {
        title: 'Cómo Elegir la Plantilla Correcta',
        description: 'Invoiceo incluye 12 diseños profesionales adaptados a diferentes sectores y preferencias estéticas:',
        tips: [
          'Clásico Profesional: Ideal para consultores, asesores y servicios corporativos formales.',
          'Diseño Moderno / Freelancer: Excelente para creativos, diseñadores y agencias digitales.',
          'Minimalista y Limpio: Perfecto para facturación rápida y clara sin distracciones visuales.',
        ],
      },
      keyElementsSection: {
        title: 'Qué Debe Incluir Toda Factura Válida',
        description: 'Para cumplir con la normativa fiscal y evitar retrasos en el cobro, asegúrate de incluir:',
        checklist: [
          'La palabra "FACTURA" claramente visible en la cabecera.',
          'Datos fiscales completos tanto del emisor como del cliente.',
          'Número de factura único y secuencial.',
          'Fecha de emisión y fecha límite de pago.',
          'Desglose detallado de conceptos, cantidades, precios y tasas.',
        ],
      },
      numberingSection: {
        title: 'Numeración de Facturas Simplificada',
        description: 'La legislación fiscal exige que las facturas sigan una serie correlativa sin saltos:',
        schemes: [
          { label: 'Formato Secuencial', desc: 'Ej: INV-2026-001, INV-2026-002. Ideal para autónomos y freelancers.' },
          { label: 'Formato por Años', desc: 'Ej: 2026-001, 2026-002. Facilita el control contable anual.' },
        ],
      },
      faqs: [
        { question: '¿Es realmente gratuito?', answer: 'Sí, 100% gratis sin suscripciones ni límites de facturas.' },
        { question: '¿Tiene marcas de agua?', answer: 'No. Los PDFs generados son totalmente limpios y profesionales.' },
        { question: '¿Dónde se guardan mis datos?', answer: 'Tus datos se almacenan de forma segura y privada en la memoria local de tu navegador.' },
      ],
    },
  },

  // French guides
  fr: {
    'invoice-generator': {
      h1: 'Créer une Facture Gratuite en Ligne (Sans Inscription, Sans Filigrane) : Guide Complet',
      introParagraphs: [
        'Se faire payer rapidement commence par une facture claire, irréprochable et conforme à la législation. Pourtant, la plupart des logiciels imposent des abonnements payants ou limitent le nombre de documents émis chaque mois.',
        'Invoiceo est un outil 100 % gratuit dans votre navigateur. Aucune création de compte n\'est requise, aucun filigrane n\'est apposé et vos données restent stockées localement sur votre ordinateur.',
        'Ce guide pratique vous détaille les mentions obligatoires d\'une facture conforme, les astuces pour accélérer vos règlements et des exemples concrets pour freelances, artisans et consultants.',
      ],
      tableOfContents: [
        { id: 'what-is-invoice-generator', label: 'Qu\'est-ce que le générateur de factures ?' },
        { id: 'key-features', label: 'Fonctionnalités Clés' },
        { id: 'how-to-create-an-invoice', label: 'Comment créer une facture en 7 étapes' },
        { id: 'choosing-the-right-template', label: 'Choisir le bon modèle' },
        { id: 'receipts-credit-notes-proforma-quotes', label: 'Reçus, Devis et Avoirs' },
        { id: 'what-every-invoice-should-include', label: 'Mentions obligatoires sur une facture' },
        { id: 'invoice-numbering-made-simple', label: 'Numérotation des factures' },
        { id: 'tips-to-get-paid-faster', label: 'Astuces pour être payé plus vite' },
        { id: 'privacy-data-handling', label: 'Confidentialité et sécurité' },
        { id: 'faq', label: 'Questions Fréquentes (FAQ)' },
      ],
      whatIsTitle: 'Qu\'est-ce qu\'Invoiceo ?',
      whatIsDescription:
        'Une suite d\'édition documentaire conçue pour simplifier la vie des indépendants et des entrepreneurs souhaitant facturer sans complexité.',
      goodFitList: [
        'Freelances, créatifs et consultants facturant des prestations intellectuelles',
        'Artisans, techniciens et prestataires de services de proximité',
        'Micro-entreprises cherchant une solution de facturation rapide et gratuite',
      ],
      featuresTable: [
        { feature: 'Sans Inscription', benefit: 'Accédez à l\'outil et éditez vos factures instantanément.' },
        { feature: 'Zéro Filigrane', benefit: 'Téléchargez des PDF professionnels prêts à être envoyés.' },
        { feature: 'PDF Vectoriel Recherche', benefit: 'Les clients et comptables peuvent copier les montants et numéros.' },
        { feature: 'Calcul Automatique', benefit: 'TVA, remises et totaux calculés en temps réel.' },
        { feature: 'Multidevise', benefit: 'Facturez en Euros (€), Dollars ($), Livres (£) et plus de 40 devises.' },
        { feature: 'Confidentialité Totale', benefit: 'Vos données restent strictement dans votre navigateur.' },
      ],
      stepsTitle: 'Comment Créer une Facture Professionnelle en 7 Étapes',
      steps: [
        { title: 'Étape 1 : Ouvrir le générateur', description: 'Accédez à Invoiceo depuis n\'importe quel appareil sans installation.' },
        { title: 'Étape 2 : Coordonnées de l\'émetteur (De)', description: 'Saisissez votre raison sociale, adresse, e-mail et numéro SIRET / TVA.' },
        { title: 'Étape 3 : Coordonnées du client (Facturer à)', description: 'Ajoutez le nom et l\'adresse de facturation de votre client.' },
        { title: 'Étape 4 : Numéro et dates', description: 'Définissez la date d\'émission, la date d\'échéance et un numéro de facture unique.' },
        { title: 'Étape 5 : Lignes d\'articles', description: 'Détaillez les prestations ou produits avec quantités, prix unitaires et TVA.' },
        { title: 'Étape 6 : Modalités de paiement', description: 'Indiquez votre IBAN, BIC ou instructions de virement bancaire.' },
        { title: 'Étape 7 : Télécharger le PDF', description: 'Vérifiez l\'aperçu instantané et téléchargez votre PDF de haute qualité.' },
      ],
      templatesSection: {
        title: 'Choisir le Bon Modèle de Facture',
        description: 'Invoiceo propose 12 modèles élégants et professionnels adaptés à chaque profession.',
        tips: [
          'Classique Professionnel : Sobriété et clarté pour les prestations de services.',
          'Moderne & Épuré : Idéal pour les créatifs, designers et agences web.',
        ],
      },
      keyElementsSection: {
        title: 'Mentions Légales Obligatoires',
        description: 'Pour être en conformité, votre facture doit obligatoirement comporter :',
        checklist: [
          'La mention "FACTURE" et un numéro unique.',
          'Les coordonnées complètes du vendeur et de l\'acheteur.',
          'La date d\'émission et la date limite de règlement.',
          'Le détail des produits ou services avec taux de TVA applicable.',
        ],
      },
      numberingSection: {
        title: 'Règles de Numérotation',
        description: 'Les factures doivent suivre une suite chronologique continue sans rupture.',
        schemes: [
          { label: 'Séquentiel classique', desc: 'Ex : FAC-2026-001, FAC-2026-002.' },
          { label: 'Basé sur l\'année', desc: 'Ex : 2026-01, 2026-02.' },
        ],
      },
      faqs: [
        { question: 'Est-ce vraiment gratuit ?', answer: 'Oui, 100 % gratuit sans abonnement.' },
        { question: 'Y a-t-il un filigrane sur le PDF ?', answer: 'Aucun filigrane, vos factures sont parfaitement professionnelles.' },
        { question: 'Où sont stockées mes données ?', answer: 'Uniquement dans la mémoire locale de votre navigateur.' },
      ],
    },
  },

  // German guides
  de: {
    'invoice-generator': {
      h1: 'Kostenlos Rechnung Schreiben Online (Ohne Anmeldung, Ohne Wasserzeichen): Komplette Anleitung',
      introParagraphs: [
        'Eine ordnungsgemäße und GoBD-konforme Rechnung ist die Voraussetzung für schnelle Zahlungseingänge. Viele Online-Generatoren verlangen jedoch Abonnements oder versehen Ihre Rechnungen mit störenden Wasserzeichen.',
        'Invoiceo funktioniert vollkommen kostenlos und ohne Registrierung direkt im Browser. Ihre sensiblen Geschäftsdaten verlassen niemals Ihren Rechner.',
        'In diesem Leitfaden erfahren Sie alle Pflichtangaben einer Rechnung, Tipps zur Rechnungsnummerierung und einsatzbereite Muster für Freiberufler und Handwerker.',
      ],
      tableOfContents: [
        { id: 'what-is-invoice-generator', label: 'Was ist der Rechnungsgenerator?' },
        { id: 'key-features', label: 'Hauptmerkmale' },
        { id: 'how-to-create-an-invoice', label: 'Rechnung in 7 Schritten erstellen' },
        { id: 'choosing-the-right-template', label: 'Die passende Vorlage wählen' },
        { id: 'receipts-credit-notes-proforma-quotes', label: 'Quittungen, Angebote und Gutschriften' },
        { id: 'what-every-invoice-should-include', label: 'Pflichtangaben nach UStG' },
        { id: 'invoice-numbering-made-simple', label: 'Rechnungsnummerierung' },
        { id: 'tips-to-get-paid-faster', label: 'Tipps für schnellere Zahlungen' },
        { id: 'privacy-data-handling', label: 'Datenschutz & Sicherheit' },
        { id: 'faq', label: 'Häufig gestellte Fragen (FAQ)' },
      ],
      whatIsTitle: 'Was ist Invoiceo?',
      whatIsDescription:
        'Ein minimalistisches, sicheres Werkzeug zur schnellen Erstellung von Geschäftsdokumenten und Rechnungen als PDF.',
      goodFitList: [
        'Freiberufler und Selbstständige ohne teure Buchhaltungssoftware',
        'Handwerker und Dienstleister mit Kunden vor Ort',
        'Kleinunternehmer gemäß § 19 UStG mit unkomplizierter Abrechnung',
      ],
      featuresTable: [
        { feature: 'Keine Anmeldung', benefit: 'Sofort starten ohne Account-Erstellung.' },
        { feature: 'Keine Wasserzeichen', benefit: 'Saubere, professionelle PDFs für Ihre Kunden.' },
        { feature: 'Durchsuchbares PDF', benefit: 'Beträge und Nummern direkt kopierbar.' },
        { feature: 'Automatische Berechnung', benefit: 'MwSt., Rabatte und Summen fehlerfrei berechnet.' },
        { feature: 'Mehrwährungsfähig', benefit: 'Rechnungen in Euro (€), US-Dollar ($) und weiteren Währungen.' },
        { feature: '100% Datenschutz', benefit: 'Daten verbleiben lokal in Ihrem Browser.' },
      ],
      stepsTitle: 'Rechnung Erstellen in 7 Einfachen Schritten',
      steps: [
        { title: 'Schritt 1: Rechnungsgenerator öffnen', description: 'Rufen Sie Invoiceo direkt im Browser auf.' },
        { title: 'Schritt 2: Absenderdaten eingeben (Von)', description: 'Name, Anschrift, Steuernummer / USt-IdNr. erfassen.' },
        { title: 'Schritt 3: Kundendaten erfassen (Rechnung an)', description: 'Empfänger und Rechnungsadresse eintragen.' },
        { title: 'Schritt 4: Rechnungsnummer & Datum', description: 'Ausstellungsdatum, Fälligkeit und eindeutige Rechnungsnummer festlegen.' },
        { title: 'Schritt 5: Positionen hinzufügen', description: 'Leistungen, Mengen, Einzelpreise und MwSt.-Satz angeben.' },
        { title: 'Schritt 6: Zahlungsbedingungen & IBAN', description: 'Bankverbindung und Zahlungsziel vermerken.' },
        { title: 'Schritt 7: PDF herunterladen', description: 'Vorschau prüfen und druckfertiges PDF speichern.' },
      ],
      templatesSection: {
        title: 'Die Richtige Vorlage Wählen',
        description: 'Wählen Sie aus 12 professionellen Layouts das passende Design für Ihr Unternehmen.',
        tips: [
          'Klassisch Professional: Seriosität für Berater und Agenturen.',
          'Modern & Sauber: Perfekt für Dienstleister und moderne Gewerbe.',
        ],
      },
      keyElementsSection: {
        title: 'Pflichtangaben einer Rechnung nach UStG',
        description: 'Eine steuerkonforme Rechnung muss folgende Angaben enthalten:',
        checklist: [
          'Vollständiger Name und Anschrift des leistenden Unternehmers und des Leistungsempfängers.',
          'Steuernummer oder Umsatzsteuer-Identifikationsnummer (USt-IdNr.).',
          'Ausstellungsdatum und fortlaufende Rechnungsnummer.',
          'Menge und Art der gelieferten Gegenstände oder Umfang der Leistung.',
          'Entgelt und darauf entfallender Steuerbetrag sowie Steuersatz.',
        ],
      },
      numberingSection: {
        title: 'Rechnungsnummern richtig vergeben',
        description: 'Das Finanzamt fordert lückenlose und fortlaufende Rechnungsnummern.',
        schemes: [
          { label: 'Fortlaufende Nummern', desc: 'Z.B. RE-2026-001, RE-2026-002.' },
          { label: 'Jahrgangsbasiert', desc: 'Z.B. 2026-001.' },
        ],
      },
      faqs: [
        { question: 'Ist die Nutzung wirklich kostenlos?', answer: 'Ja, absolut kostenlos ohne versteckte Gebühren.' },
        { question: 'Gibt es Wasserzeichen auf der Rechnung?', answer: 'Nein, alle PDFs sind absolut sauber und werbefrei.' },
        { question: 'Wo werden meine Rechnungen gespeichert?', answer: 'Sicher und privat im lokalen Speicher Ihres Browsers.' },
      ],
    },
  },

  // Portuguese guides
  pt: {
    'invoice-generator': {
      h1: 'Gerador de Faturas e Notas Comerciais Grátis (Sem Cadastro): Guia Completo',
      introParagraphs: [
        'Cobrar com rapidez e clareza é fundamental para a saúde financeira de qualquer negócio. Muitas ferramentas cobram mensalidades caras ou inserem marcas d\'água incômodas.',
        'Com o Invoiceo, você gera faturas e cobranças comerciais 100% grátis e com total privacidade no seu navegador. Sem cadastros, sem senhas e sem limites.',
        'Este guia completo aborda os requisitos essenciais de uma fatura, dicas para acelerar recebimentos e exemplos práticos para profissionais autônomos e pequenas empresas.',
      ],
      tableOfContents: [
        { id: 'what-is-invoice-generator', label: 'O que é o Gerador de Faturas?' },
        { id: 'key-features', label: 'Principais Recursos' },
        { id: 'how-to-create-an-invoice', label: 'Como criar uma fatura em 7 passos' },
        { id: 'choosing-the-right-template', label: 'Escolhendo o modelo ideal' },
        { id: 'receipts-credit-notes-proforma-quotes', label: 'Recibos, Orçamentos e Notas' },
        { id: 'what-every-invoice-should-include', label: 'O que toda fatura deve conter' },
        { id: 'invoice-numbering-made-simple', label: 'Numeração de faturas' },
        { id: 'tips-to-get-paid-faster', label: 'Dicas para receber mais rápido' },
        { id: 'privacy-data-handling', label: 'Privacidade e segurança' },
        { id: 'faq', label: 'Perguntas Frequentes (FAQ)' },
      ],
      whatIsTitle: 'O que é o Invoiceo?',
      whatIsDescription:
        'Uma suíte de geração de documentos comerciais rápidos, profissionais e sem burocracia.',
      goodFitList: [
        'Freelancers e profissionais liberais que prestam serviços digitais',
        'Prestadores de serviços, consultores e agências',
        'Pequenas empresas que buscam agilidade sem custos de softwares complexos',
      ],
      featuresTable: [
        { feature: 'Sem Cadastro', benefit: 'Abra e crie faturas imediatamente.' },
        { feature: 'Sem Marca d\'Água', benefit: 'PDFs limpios e profissionais para seus clientes.' },
        { feature: 'PDF Pesquisável', benefit: 'Valores e números copiáveis no documento.' },
        { feature: 'Cálculo Automático', benefit: 'Subtotais, impostos e descontos calculados na hora.' },
        { feature: 'Múltiplas Moedas', benefit: 'Fature em Reais (R$), Dólares ($), Euros (€) e mais.' },
        { feature: 'Privacidade no Navegador', benefit: 'Seus dados ficam salvos apenas no seu dispositivo.' },
      ],
      stepsTitle: 'Como Criar uma Fatura Profissional em 7 Passos',
      steps: [
        { title: 'Passo 1: Acessar o Gerador', description: 'Abra a ferramenta diretamente no navegador.' },
        { title: 'Passo 2: Informações do Emitente (De)', description: 'Insira o nome da sua empresa, CNPJ/CPF e endereço.' },
        { title: 'Passo 3: Dados do Cliente (Faturar para)', description: 'Adicione o nome e endereço do cliente.' },
        { title: 'Passo 4: Datas e Número', description: 'Defina a data de emissão, vencimento e número do documento.' },
        { title: 'Passo 5: Adicionar Itens', description: 'Descreva os serviços ou produtos, quantidades e valores.' },
        { title: 'Passo 6: Dados de Pagamento', description: 'Informe sua chave PIX, dados bancários ou instruções.' },
        { title: 'Passo 7: Baixar PDF', description: 'Visualize em tempo real e baixe o PDF pronto.' },
      ],
      templatesSection: {
        title: 'Escolhendo o Modelo Ideal',
        description: 'São 12 layouts profissionais ajustados para diversos nichos de mercado.',
        tips: [
          'Clássico Profissional : Perfeito para consultorias e prestadores corporativos.',
          'Moderno & Criativo : Excelente para designers e agências.',
        ],
      },
      keyElementsSection: {
        title: 'O que toda fatura precisa ter',
        description: 'Garanta que seus documentos contenham:',
        checklist: [
          'Identificação clara do documento (Fatura / Recibo).',
          'Dados completos do emitente e do tomador do serviço.',
          'Número de série ou identificador único.',
          'Data de emissão e vencimento.',
          'Discriminação detalhada dos itens e valores.',
        ],
      },
      numberingSection: {
        title: 'Organização da Numeração',
        description: 'Mantenha uma sequência lógica e sem repetições.',
        schemes: [
          { label: 'Sequencial padrão', desc: 'Ex: FAT-2026-001.' },
          { label: 'Por ano e número', desc: 'Ex: 2026-01.' },
        ],
      },
      faqs: [
        { question: 'É realmente gratuito?', answer: 'Sim, 100% gratuito sem mensalidades.' },
        { question: 'Possui marcas d\'água?', answer: 'Não, o PDF sai limpo e profissional.' },
        { question: 'Onde ficam salvos os dados?', answer: 'No armazenamento local do seu navegador com total privacidade.' },
      ],
    },
  },

  // Italian guides
  it: {
    'invoice-generator': {
      h1: 'Creare Fattura Gratis Online (Senza Registrazione): Guida Completa con Esempi',
      introParagraphs: [
        'Ricevere i pagamenti puntualmente richiede l\'emissione di fatture chiare, professionali e conformi alle norme. Invoiceo ti consente di creare fatture in PDF gratuitamente senza bisogno di creare un account.',
        'Tutti i dati rimangono salvati nella memoria del tuo browser per garantirti la massima privacy. Nessun abbonamento, nessuna registrazione richiesta.',
        'Questa guida illustra gli elementi obbligatori per una fattura corretta e i consigli pratici per liberi professionisti e piccole imprese.',
      ],
      tableOfContents: [
        { id: 'what-is-invoice-generator', label: 'Cos\'è il generatore di fatture?' },
        { id: 'key-features', label: 'Caratteristiche Principali' },
        { id: 'how-to-create-an-invoice', label: 'Come creare una fattura in 7 passaggi' },
        { id: 'choosing-the-right-template', label: 'Scegliere il modello giusto' },
        { id: 'receipts-credit-notes-proforma-quotes', label: 'Ricevute, Preventivi e Note di Credito' },
        { id: 'what-every-invoice-should-include', label: 'Cosa deve includere una fattura' },
        { id: 'invoice-numbering-made-simple', label: 'Numerazione delle fatture' },
        { id: 'tips-to-get-paid-faster', label: 'Consigli per farsi pagare prima' },
        { id: 'privacy-data-handling', label: 'Privacy e gestione dati' },
        { id: 'faq', label: 'Domande Frequenti (FAQ)' },
      ],
      whatIsTitle: 'Cos\'è Invoiceo?',
      whatIsDescription:
        'Uno strumento gratuito pensato per liberi professionisti e freelance che desiderano emettere documenti commerciali in pochi clic.',
      goodFitList: [
        'Freelance e professionisti conpartita IVA',
        'Consulenti, tecnici e prestatori di servizi',
        'Piccole attività che cercano semplicità senza software complessi',
      ],
      featuresTable: [
        { feature: 'Senza Registrazione', benefit: 'Crea fatture subito senza password.' },
        { feature: 'Senza Filigrana', benefit: 'PDF puliti e professionali pronti per i clienti.' },
        { feature: 'PDF Ricercabile', benefit: 'Dati e importi facilmente copiabili.' },
        { feature: 'Calcolo Automatico', benefit: 'Imponibile, IVA e totali calcolati in tempo reale.' },
        { feature: 'Valute Multiple', benefit: 'Fattura in Euro (€), Dollari ($) e altre valute.' },
        { feature: 'Privacy Garantita', benefit: 'I dati restano al sicuro nel tuo browser.' },
      ],
      stepsTitle: 'Come Creare una Fattura in 7 Passaggi',
      steps: [
        { title: 'Passo 1 : Aprire il generatore', description: 'Accedi a Invoiceo dal tuo browser preferito.' },
        { title: 'Passo 2 : Dati Emittente (Da)', description: 'Inserisci nome, indirizzo, partita IVA e contatti.' },
        { title: 'Passo 3 : Dati Cliente (Fatturato a)', description: 'Aggiungi i riferimenti fiscali del cliente.' },
        { title: 'Passo 4 : Date e Numero', description: 'Imposta data fattura, scadenza e numero progressivo.' },
        { title: 'Passo 5 : Voci e Servizi', description: 'Dettaglia quantità, descrizione, prezzi unitari e IVA.' },
        { title: 'Passo 6 : Modalità di Pagamento', description: 'Indica l\'IBAN o le istruzioni di bonifico.' },
        { title: 'Passo 7 : Scarica PDF', description: 'Controlla l\'anteprima e scarica il PDF.' },
      ],
      templatesSection: {
        title: 'Scegliere il Modello Giusto',
        description: 'Scegli tra 12 layout professionali per ogni esigenza aziendale.',
        tips: [
          'Classico Professionale : Ideale per consulenti e professionisti.',
          'Moderno & Pulito : Perfetto per agenzie e creativi.',
        ],
      },
      keyElementsSection: {
        title: 'Cosa deve contenere una fattura',
        description: 'Verifica sempre la presenza di:',
        checklist: [
          'Intestazione chiara (Fattura / Ricevuta).',
          'Partita IVA e dati anagrafici di emittente e cliente.',
          'Numero progressivo univoco.',
          'Data di emissione e termini di pagamento.',
          'Dettaglio dei beni o servizi prestati.',
        ],
      },
      numberingSection: {
        title: 'Regole di Numerazione',
        description: 'La numerazione deve essere progressiva e senza salti.',
        schemes: [
          { label: 'Sequenziale standard', desc: 'Es: FAT-2026-001.' },
          { label: 'Basata sull\'anno', desc: 'Es: 2026-01.' },
        ],
      },
      faqs: [
        { question: 'È davvero gratuito?', answer: 'Sì, 100% gratuito senza costi nascosti.' },
        { question: 'Ci sono filigrane?', answer: 'No, il PDF è pulito e professionale.' },
        { question: 'Dove vengono salvati i dati?', answer: 'Nella memoria locale del tuo browser in totale privacy.' },
      ],
    },
  },
};

/**
 * Returns localized guide overrides for a given tool and language
 */
export function getLocalizedGuide(toolSlug: string, lang: string): Partial<ToolGuideData> | undefined {
  if (lang === 'en') return undefined;
  return LOCALIZED_TOOL_GUIDES[lang]?.[toolSlug];
}
