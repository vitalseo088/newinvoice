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
      whatIsTitle: '¿Qué es Invoiceo y cómo funciona?',
      whatIsDescription:
        'Invoiceo es una suite de facturación y generación de documentos comerciales en línea diseñada para profesionales que valoran la rapidez, la sencillez y la privacidad.',
      goodFitList: [
        'Autónomos y freelancers que necesitan facturar servicios digitales de forma inmediata',
        'Profesionales del sector técnico, reformas y oficios que cobran proyectos y anticipos',
        'Pequeñas empresas y negocios que buscan evitar costes mensuales de programas de facturación complejos',
        'Cualquier persona que necesite un comprobante o factura formal sin comprometer su privacidad',
      ],
    },
    'receipt-generator': {
      h1: 'Generador de Recibos de Pago Gratis (Sin Registro): Guía Oficial con Ejemplos',
      introParagraphs: [
        'Emitir un justificante o recibo de pago inmediatamente genera confianza y previene cualquier disputa con clientes. Ya sea que cobres en efectivo, transferencia bancaria o tarjeta, los clientes necesitan un comprobante claro para su contabilidad y justificación de gastos.',
        'El generador de recibos de Invoiceo te permite emitir recibos profesionales en PDF con método de pago, número de operación y desglose de impuestos en cuestión de segundos.',
      ],
      whatIsTitle: '¿Qué es un Recibo de Pago?',
      whatIsDescription:
        'Un recibo de pago es un documento oficial que acredita la entrega de una cantidad de dinero en concepto de pago por un producto o servicio ya recibido, confirmando que la deuda ha sido saldada.',
    },
    'quote-generator': {
      h1: 'Generador de Presupuestos Comerciales Online Gratis: Guía Práctica',
      introParagraphs: [
        'Presentar un presupuesto profesional y bien estructurado es el primer paso para cerrar contratos con clientes exigentes. Un buen presupuesto debe definir con precisión el alcance del trabajo, los plazos de validez y las condiciones económicas.',
        'Con Invoiceo puedes crear propuestas económicas impecables en PDF en minutos, sin necesidad de darte de alta ni pagar cuotas.',
      ],
      whatIsTitle: '¿Qué es un Presupuesto Comercial?',
      whatIsDescription:
        'Es una oferta formal en la que se detallan los precios y condiciones bajo los cuales un profesional o empresa se compromete a realizar un determinado trabajo o entregar mercancía.',
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
      whatIsTitle: 'Qu\'est-ce qu\'Invoiceo ?',
      whatIsDescription:
        'Une suite d\'édition documentaire conçue pour simplifier la vie des indépendants et des entrepreneurs souhaitant facturer sans complexité.',
      goodFitList: [
        'Freelances, créatifs et consultants facturant des prestations intellectuelles',
        'Artisans, techniciens et prestataires de services de proximité',
        'Micro-entreprises cherchant une solution de facturation rapide et gratuite',
      ],
    },
    'receipt-generator': {
      h1: 'Générateur de Reçu de Paiement Gratuit : Guide et Modèles Conformes',
      introParagraphs: [
        'Délivrer un reçu de paiement immédiat prouve la bonne réception des fonds et rassure vos clients. Que vous receviez un virement, un chèque ou un paiement en espèces, le reçu formalise la transaction.',
        'Créez et imprimez des reçus et quittances claires avec Invoiceo en quelques clics.',
      ],
      whatIsTitle: 'Qu\'est-ce qu\'un reçu de paiement ?',
      whatIsDescription:
        'Un justificatif remis au client attestant du règlement d\'une somme due, libérant ainsi ce dernier de son obligation financière.',
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
      whatIsTitle: 'Was ist Invoiceo?',
      whatIsDescription:
        'Ein minimalistisches, sicheres Werkzeug zur schnellen Erstellung von Geschäftsdokumenten und Rechnungen als PDF.',
      goodFitList: [
        'Freiberufler und Selbstständige ohne teure Buchhaltungssoftware',
        'Handwerker und Dienstleister mit Kunden vor Ort',
        'Kleinunternehmer gemäß § 19 UStG mit unkomplizierter Abrechnung',
      ],
    },
    'receipt-generator': {
      h1: 'Quittung Online Erstellen Kostenlos: Anleitung und PDF-Quittungsvorlage',
      introParagraphs: [
        'Eine Quittung dient als rechtsgültiger Nachweis über den Erhalt einer Zahlung. Insbesondere bei Barzahlungen schützt sie beide Vertragsparteien vor Missverständnissen.',
        'Mit Invoiceo füllen Sie die Quittungsdaten online aus und laden das fertige Dokument als druckreifes PDF herunter.',
      ],
      whatIsTitle: 'Was ist eine Quittung?',
      whatIsDescription:
        'Eine Empfangsbestätigung des Gläubigers an den Schuldner, die den Erhalt einer Leistung oder Geldzahlung quittiert.',
    },
  },

  // Portuguese guides
  pt: {
    'invoice-generator': {
      h1: 'Gerador de Faturas e Notas Comerciais Grátis (Sem Cadastro): Guia Completo',
      introParagraphs: [
        'Cobrar com rapidez e clareza é fundamental para a saúde financeira de qualquer negócio. Muitas ferramentas cobram mensalidades caras ou inserem marcas d\'água incômodas.',
        'Com o Invoiceo, você gera faturas e cobranças comerciais 100% grátis e com total privacidade no seu navegador.',
      ],
      whatIsTitle: 'O que é o Invoiceo?',
      whatIsDescription:
        'Uma suíte de geração de documentos comerciais rápidos e sem burocracia.',
    },
  },

  // Italian guides
  it: {
    'invoice-generator': {
      h1: 'Creare Fattura Gratis Online (Senza Registrazione): Guida Completa con Esempi',
      introParagraphs: [
        'Ricevere i pagamenti puntualmente richiede l\'emissione di fatture chiare, professionali e conformi alle norme. Invoiceo ti consente di creare fatture in PDF gratuitamente senza bisogno di creare un account.',
        'Tutti i dati rimangono salvati nella memoria del tuo browser per garantirti la massima privacy.',
      ],
      whatIsTitle: 'Cos\'è Invoiceo?',
      whatIsDescription:
        'Uno strumento gratuito pensato per liberi professionisti e freelance che desiderano emettere documenti commerciali in pochi clic.',
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
