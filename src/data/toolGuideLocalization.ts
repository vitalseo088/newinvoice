import i18n from '../utils/i18n';
import { ToolGuideData } from './toolGuidesData';

type Scenario = {
  industry: string;
  headline: string;
  item: string;
  currency: string;
  rate: number;
  qty: number;
  note: string;
};

type GuideCopy = {
  guideWord: string;
  stepPrefix: string;
  suitableFor: string[];
  intro: (name: string, description: string) => string[];
  contents: string;
  overview: string;
  fit: string;
  features: string;
  feature: string;
  benefit: string;
  stepsTitle: string;
  stepsLead: (name: string) => string;
  stepTitles: string[];
  stepDescriptions: (name: string) => string[];
  layout: string;
  layoutDescription: (name: string) => string;
  layoutTips: string[];
  essentials: string;
  essentialsDescription: string;
  checklist: string[];
  numbering: string;
  numberingDescription: string;
  numberingExamples: { label: string; desc: string }[];
  examples: string;
  examplesDescription: (name: string) => string;
  bestPractices: string;
  practices: { title: string; desc: string }[];
  faq: string;
  questions: { question: string; answer: (name: string) => string }[];
  privacyTitle: string;
  privacyDescription: string;
  privacyPoints: string[];
  sampleItems: string;
  currencyLabel: string;
  notesLabel: string;
  exampleLead: string;
  featureRows: { feature: string; benefit: string }[];
};

const scenario = (industry: string, headline: string, item: string, rate: number, note: string, qty = 1, currency = 'EUR'): Scenario => ({
  industry, headline, item, rate, note, qty, currency,
});

const scenarios: Record<string, Record<string, Scenario>> = {
  es: {
    'receipt-generator': scenario('Peluquería · Madrid', 'Cobro de un servicio de peluquería', 'Corte y coloración', 68, 'Recibo emitido después del cobro con tarjeta.'),
    'invoice-generator': scenario('Diseño freelance · Madrid', 'Factura por identidad visual para una cafetería', 'Diseño de logotipo y carta digital', 640, 'Factura emitida por una profesional autónoma; confirma tus datos fiscales antes de enviarla.'),
    'quote-generator': scenario('Reformas · Sevilla', 'Presupuesto para renovar un baño', 'Instalación de grifería y alicatado', 1240, 'Oferta válida durante 15 días; materiales detallados antes de comenzar.'),
    'estimate-generator': scenario('Instalaciones · Valencia', 'Estimación para instalar climatización', 'Bomba de calor y montaje', 2890, 'Estimación inicial sujeta a visita y comprobación del espacio.'),
    'credit-note-generator': scenario('Tienda online · Barcelona', 'Abono por devolución de un pedido', 'Devolución de lámpara de sobremesa', 89.9, 'Vincula el abono con la factura y el pedido originales.'),
    'purchase-order-generator': scenario('Cafetería · Girona', 'Pedido mensual a un tostador local', 'Café de especialidad en grano', 18.5, 'Confirma cantidades y fecha de entrega con el proveedor.', 24),
    'sales-order-generator': scenario('Fabricación · Zaragoza', 'Confirmación de pedido para un distribuidor', 'Estantería modular de almacén', 142, 'Indica el plazo de preparación y la dirección de entrega.', 12),
    'proforma-invoice-generator': scenario('Exportación textil · Valencia', 'Envío de muestras textiles a Marruecos', 'Muestras de tejido de algodón', 22, 'Incluye origen, descripción y moneda acordada para el trámite aduanero.', 20),
    'timesheet-generator': scenario('Diseño digital · Madrid', 'Horas de diseño para una agencia', 'Diseño de interfaz · 6 horas', 48, 'Resume el periodo y solicita la validación del cliente.'),
    'work-order-generator': scenario('Servicio técnico · Málaga', 'Parte de reparación de aire acondicionado', 'Diagnóstico y limpieza de unidad', 96, 'Registra el trabajo realizado y deja espacio para la conformidad del cliente.'),
    'account-statement-generator': scenario('Consultoría · Bilbao', 'Resumen mensual para un cliente', 'Asesoría de operaciones · factura 2026-018', 720, 'Indica los pagos recibidos y el saldo pendiente del periodo.'),
    'packing-slip-generator': scenario('Comercio electrónico · Alicante', 'Paquete de textiles para el hogar', 'Juego de toallas de algodón', 0, 'El albarán identifica el contenido sin mostrar precios.', 3),
  },
  fr: {
    'invoice-generator': scenario('Photographie indépendante · Lyon', 'Facture pour une séance photo de produits', 'Prise de vue et retouches · 8 h', 75, 'Exemple de facture de prestation ; adaptez les mentions à votre régime.'),
    'receipt-generator': scenario('Salon de coiffure · Lyon', 'Paiement d’une prestation en salon', 'Coupe et brushing', 58, 'Émis après l’encaissement par carte bancaire.'),
    'quote-generator': scenario('Artisanat · Bordeaux', 'Devis pour rénover une salle de bain', 'Pose de carrelage et robinetterie', 1380, 'Précisez la durée de validité et les fournitures comprises.'),
    'estimate-generator': scenario('Rénovation · Nantes', 'Estimation de travaux d’isolation', 'Isolation des combles · pose comprise', 2150, 'Montant indicatif à confirmer après visite du chantier.'),
    'credit-note-generator': scenario('Boutique · Paris', 'Avoir après retour d’un article', 'Retour d’un luminaire', 74, 'Référencez la facture initiale et le motif de l’avoir.'),
    'purchase-order-generator': scenario('Restaurant · Lille', 'Commande hebdomadaire à un fournisseur', 'Farine de meunerie locale', 2.4, 'Confirmez l’unité, la quantité et la date de livraison.', 50),
    'sales-order-generator': scenario('Atelier · Toulouse', 'Confirmation de commande client', 'Table en chêne fabriquée sur mesure', 890, 'Ajoutez le délai de fabrication et le créneau de livraison.'),
    'proforma-invoice-generator': scenario('Export · Le Havre', 'Envoi de pièces détachées au Maroc', 'Échantillons de pièces mécaniques', 42, 'Indiquez le pays d’origine et la devise utilisée pour la déclaration.', 10),
    'timesheet-generator': scenario('Conseil numérique · Paris', 'Temps passé sur une mission client', 'Atelier de recherche utilisateur · 4 h', 85, 'Faites valider les heures par la personne référente.'),
    'work-order-generator': scenario('Dépannage · Marseille', 'Intervention sur une chaudière', 'Diagnostic et remplacement du thermostat', 165, 'Consignez les vérifications et la réception des travaux.'),
    'account-statement-generator': scenario('Agence · Rennes', 'Relevé mensuel des opérations client', 'Maintenance du site · facture FAC-2026-014', 380, 'Récapitulez les règlements et le solde à une date précise.'),
    'packing-slip-generator': scenario('E-commerce · Strasbourg', 'Colis de produits artisanaux', 'Coffret de savons fabriqués en Alsace', 0, 'Listez le contenu expédié sans afficher son prix.', 4),
  },
  de: {
    'invoice-generator': scenario('Freie Beratung · Berlin', 'Rechnung für einen Workshop zur Prozessanalyse', 'Vorbereitung und Workshop · 6 Std.', 115, 'Beispiel für eine Beratungsleistung; Pflichtangaben hängen vom Einzelfall ab.'),
    'receipt-generator': scenario('Friseursalon · Köln', 'Bezahlte Dienstleistung im Salon', 'Haarschnitt und Styling', 62, 'Quittung nach bestätigter Kartenzahlung ausstellen.'),
    'quote-generator': scenario('Handwerk · Hamburg', 'Angebot für eine Badmodernisierung', 'Armaturen und Fliesen verlegen', 1580, 'Gültigkeit und enthaltene Materialien klar nennen.'),
    'estimate-generator': scenario('Bau · München', 'Kostenschätzung für eine Wärmepumpe', 'Wärmepumpe einschließlich Montage', 7400, 'Vorläufiger Richtwert, nach Besichtigung zu bestätigen.'),
    'credit-note-generator': scenario('Einzelhandel · Berlin', 'Gutschrift nach einer Warenrückgabe', 'Rückgabe einer Schreibtischleuchte', 79, 'Ursprüngliche Rechnung und Grund der Korrektur angeben.'),
    'purchase-order-generator': scenario('Bäckerei · Freiburg', 'Bestellung bei einer regionalen Mühle', 'Weizenmehl Type 550', 1.3, 'Menge, Verpackung und Liefertermin mit dem Lieferanten abstimmen.', 80),
    'sales-order-generator': scenario('Maschinenbau · Stuttgart', 'Auftragsbestätigung für einen Kunden', 'Ersatzteilset für Produktionsanlage', 325, 'Lieferumfang und voraussichtlichen Versandtermin festhalten.', 6),
    'proforma-invoice-generator': scenario('Export · Bremen', 'Maschinenersatzteile für eine Lieferung nach Marokko', 'Dichtungssatz aus deutscher Fertigung', 48, 'Herkunftsland, Warenbeschreibung und verwendete Währung aufführen.', 15),
    'timesheet-generator': scenario('IT-Beratung · Berlin', 'Projektstunden für einen Geschäftskunden', 'API-Implementierung · 5 Stunden', 105, 'Abrechnungszeitraum und Freigabe dokumentieren.'),
    'work-order-generator': scenario('Gebäudeservice · Leipzig', 'Wartungsauftrag für eine Heizungsanlage', 'Inspektion und Filterwechsel', 145, 'Befund, ausgeführte Arbeiten und Abnahme eintragen.'),
    'account-statement-generator': scenario('Bürodienstleistung · Frankfurt', 'Monatsübersicht eines Geschäftskontos', 'IT-Wartung · Rechnung RG-2026-021', 540, 'Zahlungseingänge und offenen Betrag mit Stichtag zeigen.'),
    'packing-slip-generator': scenario('Versandhandel · Nürnberg', 'Paket mit Haushaltswaren', 'Keramikbecher aus einer Nürnberger Werkstatt', 0, 'Packliste für den Abgleich bei Wareneingang ohne Preise.', 6),
  },
  pt: {
    'invoice-generator': scenario('Design freelancer · São Paulo', 'Fatura de identidade visual para uma cafeteria', 'Logotipo e cardápio digital', 1850, 'Exemplo de serviço profissional; confirme os dados fiscais aplicáveis.', 1, 'BRL'),
    'receipt-generator': scenario('Barbearia · São Paulo', 'Comprovante de serviço já pago', 'Corte e acabamento', 65, 'Registre o pagamento por Pix e a data em que foi recebido.', 1, 'BRL'),
    'quote-generator': scenario('Reformas · Belo Horizonte', 'Orçamento para reforma de cozinha', 'Instalação de bancada e torneira', 2850, 'Separe mão de obra e materiais e indique a validade do orçamento.', 1, 'BRL'),
    'estimate-generator': scenario('Instalação elétrica · Curitiba', 'Estimativa de modernização elétrica', 'Quadro elétrico e mão de obra', 1680, 'Confirme valores após vistoria do imóvel.', 1, 'BRL'),
    'credit-note-generator': scenario('Loja virtual · Recife', 'Crédito por devolução de produto', 'Devolução de luminária decorativa', 179.9, 'Informe a nota original e como o valor será devolvido.', 1, 'BRL'),
    'purchase-order-generator': scenario('Cafeteria · Rio de Janeiro', 'Compra semanal de café especial', 'Café em grãos de torra local', 42, 'Confirme quantidade, embalagem e prazo com o fornecedor.', 20, 'BRL'),
    'sales-order-generator': scenario('Móveis · Porto Alegre', 'Confirmação de pedido de móveis', 'Mesa de madeira sob medida', 1250, 'Registre o prazo de produção e o endereço de entrega.', 2, 'BRL'),
    'proforma-invoice-generator': scenario('Exportação · Santos', 'Envio de café verde para Portugal', 'Café arábica em sacas de 60 kg', 1150, 'Use a proforma para informar mercadoria, origem e moeda da operação.', 10, 'BRL'),
    'timesheet-generator': scenario('Desenvolvimento · Florianópolis', 'Horas de consultoria para uma startup', 'Desenvolvimento de API · 5 horas', 150, 'Informe período, atividade e valor por hora.', 5, 'BRL'),
    'work-order-generator': scenario('Manutenção · Salvador', 'Ordem para conserto de ar-condicionado', 'Limpeza e troca de filtro', 280, 'Registre diagnóstico, peças usadas e aceite do cliente.', 1, 'BRL'),
    'account-statement-generator': scenario('Agência · São Paulo', 'Resumo mensal de pagamentos do cliente', 'Gestão de anúncios · cobrança de agosto', 2100, 'Mostre cobranças, pagamentos recebidos e saldo atualizado.', 1, 'BRL'),
    'packing-slip-generator': scenario('Comércio eletrônico · Recife', 'Pacote de roupas enviado ao cliente', 'Camiseta de algodão', 0, 'Confira produtos e quantidades; deixe os valores fora do romaneio.', 3, 'BRL'),
  },
  it: {
    'invoice-generator': scenario('Consulenza indipendente · Milano', 'Fattura per un progetto di comunicazione', 'Strategia e contenuti per il sito', 780, 'Esempio per una prestazione; verifica i dati richiesti per la tua attività.'),
    'receipt-generator': scenario('Studio di parrucchiere · Milano', 'Ricevuta per un servizio saldato', 'Taglio e piega', 54, 'Rilascia la ricevuta dopo aver verificato il pagamento.'),
    'quote-generator': scenario('Artigianato · Bologna', 'Preventivo per rinnovare un bagno', 'Posa piastrelle e rubinetteria', 1480, 'Indica validità, materiali inclusi e tempi previsti.'),
    'estimate-generator': scenario('Edilizia · Torino', 'Stima per isolare un sottotetto', 'Materiali isolanti e posa', 3200, 'Conferma la stima dopo il sopralluogo e la verifica delle misure.'),
    'credit-note-generator': scenario('Negozio · Firenze', 'Nota di credito per un reso', 'Reso di una lampada da tavolo', 92, 'Collega la rettifica alla fattura e descrivi il motivo.'),
    'purchase-order-generator': scenario('Ristorante · Parma', 'Ordine settimanale a un fornitore locale', 'Parmigiano Reggiano 24 mesi', 19, 'Definisci quantità, confezione e data di consegna.', 18),
    'sales-order-generator': scenario('Arredamento · Verona', 'Conferma d’ordine per un cliente', 'Scaffale modulare in legno', 240, 'Aggiungi disponibilità, consegna e condizioni concordate.', 4),
    'proforma-invoice-generator': scenario('Export · Genova', 'Spedizione di ceramiche verso la Svizzera', 'Piatti artigianali in ceramica', 28, 'Descrivi origine, quantità e valuta per i documenti preliminari.', 30),
    'timesheet-generator': scenario('Consulenza · Roma', 'Ore di lavoro per un cliente aziendale', 'Analisi dei dati · 4 ore', 72, 'Raggruppa le attività nel periodo concordato e richiedi approvazione.'),
    'work-order-generator': scenario('Assistenza · Napoli', 'Intervento di manutenzione caldaia', 'Controllo impianto e sostituzione filtro', 135, 'Documenta le verifiche e la conferma di fine intervento.'),
    'account-statement-generator': scenario('Studio professionale · Milano', 'Riepilogo mensile per un cliente', 'Consulenza contabile · fattura 2026-024', 460, 'Indica fatture, incassi e saldo alla data di chiusura.'),
    'packing-slip-generator': scenario('E-commerce · Padova', 'Spedizione di prodotti artigianali', 'Set di ceramiche venete', 0, 'Elenca gli articoli nel pacco senza riportare i prezzi.', 2),
  },
};

const copies: Record<string, GuideCopy> = {
  es: {
    guideWord: 'Guía práctica',
    stepPrefix: 'Paso',
    suitableFor: ['Autónomos que cobran por servicios profesionales.', 'Comercios y pequeños negocios que documentan operaciones.', 'Contratistas y proveedores que coordinan trabajos o entregas.'],
    intro: (name, description) => [
      `${description} Esta guía muestra cómo preparar un ${name.toLowerCase()} claro para una operación comercial real.`,
      'Completa el formulario en el navegador, revisa los importes y descarga un PDF listo para compartir. Guarda una copia de seguridad si vas a cambiar de dispositivo.',
      'Los requisitos fiscales y comerciales varían según el país, la actividad y el tipo de documento. Comprueba las normas locales antes de usar un ejemplo como documento oficial.',
    ],
    contents: 'En esta guía', overview: 'Qué es y cuándo usarlo', fit: 'Puede resultarte útil si:', features: 'Funciones para preparar el documento', feature: 'Función', benefit: 'Cómo te ayuda',
    stepsTitle: 'Cómo preparar el documento en 5 pasos', stepsLead: (name) => `Utiliza el generador de ${name.toLowerCase()} para completar y revisar estos datos:`,
    stepTitles: ['Identifica a las partes', 'Asigna una referencia', 'Describe los conceptos', 'Añade condiciones y fechas', 'Revisa y descarga el PDF'],
    stepDescriptions: (name) => [`Añade los datos de contacto de tu negocio y del cliente, proveedor o destinatario según corresponda al ${name.toLowerCase()}.`, 'Usa un número interno único para localizar el documento y relacionarlo con otros registros.', 'Incluye una descripción concreta, unidades o horas y precio unitario; comprueba las cantidades.', 'Indica moneda, vencimiento, entrega, validez o método de pago cuando sean pertinentes.', 'Comprueba nombres, fechas, cantidades y totales en la vista previa antes de descargar el PDF.'],
    layout: 'Elige un diseño claro', layoutDescription: (name) => `Elige una plantilla legible para tu ${name.toLowerCase()} y añade el logotipo solo si ayuda al destinatario a reconocer tu negocio.`,
    layoutTips: ['Mantén visibles la referencia y la fecha.', 'Usa descripciones breves y unidades coherentes.', 'Incluye únicamente campos relevantes para este envío.'],
    essentials: 'Datos que conviene revisar', essentialsDescription: 'Antes de compartir el documento, comprueba estos puntos y las obligaciones aplicables en tu país:',
    checklist: ['Nombre e información de contacto de las partes.', 'Número o referencia y fecha del documento.', 'Descripción clara, cantidad y precio de cada concepto.', 'Moneda, impuestos y total verificados según corresponda.', 'Condiciones de pago, entrega o aceptación relevantes.'],
    numbering: 'Referencias fáciles de seguir', numberingDescription: 'Una referencia única facilita encontrar documentos y relacionarlos con pedidos, pagos o trabajos.',
    numberingExamples: [{ label: 'Por tipo y año', desc: 'Ejemplo: FAC-2026-001 o PED-2026-001.' }, { label: 'Serie por cliente', desc: 'Ejemplo: CL-014-2026-003; evita reutilizar números.' }],
    examples: 'Ejemplo comercial en España', examplesDescription: (name) => `Un caso práctico de ${name.toLowerCase()} con conceptos, importes y terminología familiar para un negocio local.`,
    bestPractices: 'Buenas prácticas', practices: [{ title: 'Guarda una copia', desc: 'Exporta tus documentos si usas otro navegador o dispositivo.' }, { title: 'Verifica cada cifra', desc: 'Comprueba unidades, impuestos y totales antes de enviar.' }, { title: 'Confirma los requisitos', desc: 'Adapta el formato a las reglas fiscales y contractuales de tu jurisdicción.' }],
    faq: 'Preguntas frecuentes', questions: [
      { question: '¿Puedo descargarlo en PDF?', answer: (n) => `Sí. Revisa la vista previa y descarga el ${n.toLowerCase()} como PDF.` },
      { question: '¿Tengo que registrarme?', answer: () => 'No hace falta crear una cuenta para generar un documento. Las copias guardadas se almacenan en este navegador.' },
      { question: '¿El ejemplo garantiza que cumpla la normativa?', answer: () => 'No. Es una referencia comercial; verifica los requisitos vigentes con la autoridad tributaria o un asesor local.' },
    ],
    privacyTitle: 'Privacidad y almacenamiento', privacyDescription: 'Los documentos se editan y guardan en el almacenamiento local del navegador de este dispositivo.',
    privacyPoints: ['Exporta una copia antes de borrar los datos del navegador.', 'El almacenamiento local no sincroniza automáticamente con otros dispositivos.'],
    sampleItems: 'Conceptos de ejemplo', currencyLabel: 'Moneda', notesLabel: 'Nota del ejemplo', exampleLead: 'Caso práctico',
    featureRows: [
      { feature: 'Vista previa inmediata', benefit: 'Comprueba el aspecto antes de compartirlo.' },
      { feature: 'Cálculos automáticos', benefit: 'Revisa los subtotales y el saldo mientras editas.' },
      { feature: 'PDF descargable', benefit: 'Guarda una copia que puedes imprimir o enviar.' },
    ],
  },
  fr: {
    guideWord: 'Guide pratique',
    stepPrefix: 'Étape',
    suitableFor: ['Indépendants qui facturent leurs prestations.', 'Commerces et petites entreprises qui suivent leurs opérations.', 'Artisans et fournisseurs qui organisent travaux ou livraisons.'],
    intro: (name, description) => [
      `${description} Ce guide explique comment préparer un ${name.toLowerCase()} adapté à une situation professionnelle concrète.`,
      'Saisissez les informations dans le formulaire, vérifiez les montants dans l’aperçu puis téléchargez le PDF. Exportez vos données avant de changer d’appareil.',
      'Les règles comptables et fiscales dépendent de votre activité et de votre juridiction. Vérifiez les obligations locales avant d’utiliser un exemple comme document officiel.',
    ],
    contents: 'Dans ce guide', overview: 'Rôle et utilisation du document', fit: 'Cet outil peut vous aider si vous êtes :', features: 'Fonctions utiles', feature: 'Fonction', benefit: 'Utilité',
    stepsTitle: 'Préparer votre document en 5 étapes', stepsLead: (name) => `Renseignez ces éléments dans le générateur de ${name.toLowerCase()} :`,
    stepTitles: ['Indiquer les parties', 'Choisir une référence', 'Détailler les lignes', 'Préciser les conditions', 'Vérifier et télécharger'],
    stepDescriptions: (name) => [`Ajoutez les coordonnées de votre entreprise et celles du client, du fournisseur ou du destinataire du ${name.toLowerCase()}.`, 'Attribuez une référence unique pour retrouver le document et le relier à vos autres dossiers.', 'Précisez le service ou le produit, la quantité ou le nombre d’heures et le prix unitaire.', 'Ajoutez la devise et les échéances, modalités de paiement ou détails de livraison utiles.', 'Relisez noms, dates, quantités et totaux dans l’aperçu avant de télécharger le PDF.'],
    layout: 'Choisir une mise en page lisible', layoutDescription: (name) => `Pour un ${name.toLowerCase()} facile à traiter, choisissez un modèle sobre et gardez la référence, la date et les montants visibles.`,
    layoutTips: ['Utilisez un intitulé et des unités sans ambiguïté.', 'N’ajoutez que les champs utiles au destinataire.', 'Gardez la même présentation pour vos dossiers similaires.'],
    essentials: 'Points à vérifier avant envoi', essentialsDescription: 'Vérifiez ces informations, puis les mentions obligatoires qui s’appliquent à votre activité :',
    checklist: ['Identité et coordonnées des parties.', 'Référence unique et date du document.', 'Désignation des biens ou services et quantités.', 'Devise, calculs et éventuelles taxes.', 'Conditions de règlement, livraison ou validation.'],
    numbering: 'Références et classement', numberingDescription: 'Une référence claire aide à rapprocher le document d’un devis, d’une commande, d’une intervention ou d’un règlement.',
    numberingExamples: [{ label: 'Série chronologique', desc: 'Exemple : FAC-2026-001 ou CMD-2026-001.' }, { label: 'Code interne', desc: 'Exemple : CLI-014-2026-003 ; ne réutilisez pas une référence.' }],
    examples: 'Exemple de situation professionnelle', examplesDescription: (name) => `Exemple contextualisé de ${name.toLowerCase()} pour une activité locale, avec une devise et des prestations réalistes.`,
    bestPractices: 'Conseils de préparation', practices: [{ title: 'Conserver une copie', desc: 'Exportez vos fichiers si vous changez de navigateur ou d’appareil.' }, { title: 'Vérifier les montants', desc: 'Contrôlez les quantités, les éventuelles taxes et le total.' }, { title: 'Vérifier les règles locales', desc: 'Le générateur ne certifie pas la conformité juridique ou fiscale.' }],
    faq: 'Questions fréquentes', questions: [
      { question: 'Puis-je télécharger le document en PDF ?', answer: (n) => `Oui, vérifiez l’aperçu puis téléchargez le ${n.toLowerCase()} au format PDF.` },
      { question: 'La création d’un compte est-elle nécessaire ?', answer: () => 'Non. Vous pouvez créer un document sans compte ; les documents conservés restent dans le navigateur utilisé.' },
      { question: 'Cet exemple est-il conforme à la réglementation ?', answer: () => 'Il sert d’illustration commerciale, pas de conseil juridique. Vérifiez les obligations auprès d’un professionnel local.' },
    ],
    privacyTitle: 'Confidentialité et conservation', privacyDescription: 'Les documents sont modifiés et conservés dans le stockage local de votre navigateur sur cet appareil.',
    privacyPoints: ['Exportez une sauvegarde avant de vider les données du navigateur.', 'Le stockage local ne synchronise pas vos fichiers entre appareils.'],
    sampleItems: 'Détail de l’exemple', currencyLabel: 'Devise', notesLabel: 'À noter', exampleLead: 'Mise en situation',
    featureRows: [
      { feature: 'Aperçu en direct', benefit: 'Vérifiez la mise en page avant de partager le fichier.' },
      { feature: 'Calculs automatiques', benefit: 'Suivez les sous-totaux et le solde pendant la saisie.' },
      { feature: 'PDF à télécharger', benefit: 'Enregistrez un fichier prêt à imprimer ou à envoyer.' },
    ],
  },
  de: {
    guideWord: 'Praxisleitfaden',
    stepPrefix: 'Schritt',
    suitableFor: ['Freiberufler, die ihre Leistungen abrechnen.', 'Kleine Unternehmen, die Vorgänge dokumentieren.', 'Handwerksbetriebe und Lieferanten mit Aufträgen oder Lieferungen.'],
    intro: (name, description) => [
      `${description} Dieser Leitfaden zeigt, wie Sie einen ${name.toLowerCase()} für einen konkreten Geschäftsfall vorbereiten.`,
      'Tragen Sie die Angaben in das Formular ein, kontrollieren Sie Beträge in der Vorschau und laden Sie anschließend das PDF herunter. Exportieren Sie Ihre Daten vor einem Gerätewechsel.',
      'Steuer- und Geschäftspflichten unterscheiden sich je nach Tätigkeit und Rechtsgebiet. Prüfen Sie die geltenden Vorgaben, bevor Sie ein Beispiel als offizielles Dokument verwenden.',
    ],
    contents: 'In diesem Leitfaden', overview: 'Zweck und Einsatz des Dokuments', fit: 'Das Werkzeug eignet sich zum Beispiel für:', features: 'Hilfreiche Funktionen', feature: 'Funktion', benefit: 'Ihr Nutzen',
    stepsTitle: 'Dokument in 5 Schritten erstellen', stepsLead: (name) => `Erfassen Sie die folgenden Angaben im ${name.toLowerCase()}-Generator:`,
    stepTitles: ['Beteiligte eintragen', 'Eindeutige Referenz vergeben', 'Positionen beschreiben', 'Bedingungen ergänzen', 'Prüfen und herunterladen'],
    stepDescriptions: (name) => [`Ergänzen Sie Kontaktdaten Ihres Unternehmens und des Kunden, Lieferanten oder Empfängers für den ${name.toLowerCase()}.`, 'Nutzen Sie eine einmalige Nummer, damit Sie das Dokument wiederfinden und Vorgängen zuordnen können.', 'Beschreiben Sie Leistung oder Ware mit Menge beziehungsweise Arbeitsstunden und Einzelpreis.', 'Ergänzen Sie Währung, Zahlungsziel und passende Liefer- oder Abnahmebedingungen.', 'Prüfen Sie Namen, Datum, Mengen und Gesamtsumme in der Vorschau und laden Sie das PDF herunter.'],
    layout: 'Übersichtliches Layout auswählen', layoutDescription: (name) => `Wählen Sie für Ihren ${name.toLowerCase()} ein gut lesbares Design. Referenz, Datum und Summen sollten schnell zu finden sein.`,
    layoutTips: ['Einheitliche Bezeichnungen und Mengeneinheiten verwenden.', 'Nur für den Empfänger relevante Felder ergänzen.', 'Ähnliche Geschäftsvorgänge einheitlich dokumentieren.'],
    essentials: 'Wichtige Angaben vor dem Versand', essentialsDescription: 'Prüfen Sie diese Angaben und beachten Sie zusätzlich die Vorschriften für Ihre konkrete Tätigkeit:',
    checklist: ['Namen und Kontaktdaten der Beteiligten.', 'Eindeutige Referenz und Ausstellungsdatum.', 'Beschreibung der Waren oder Leistungen mit Menge.', 'Währung, Berechnungen und gegebenenfalls Steuern.', 'Zahlungs-, Liefer- oder Abnahmebedingungen.'],
    numbering: 'Dokumente nachvollziehbar nummerieren', numberingDescription: 'Eine eindeutige Referenz erleichtert die Zuordnung zu Angebot, Bestellung, Zahlung oder Arbeitsauftrag.',
    numberingExamples: [{ label: 'Laufende Nummer', desc: 'Beispiel: RG-2026-001 oder AB-2026-001.' }, { label: 'Interne Kundenkennung', desc: 'Beispiel: KD-014-2026-003; Nummern nicht doppelt vergeben.' }],
    examples: 'Beispiel aus dem Geschäftsalltag', examplesDescription: (name) => `Ein regionales Praxisbeispiel für einen ${name.toLowerCase()} mit passender Leistung und Währung.`,
    bestPractices: 'Praktische Hinweise', practices: [{ title: 'Sicherung exportieren', desc: 'Exportieren Sie Daten vor einem Wechsel von Gerät oder Browser.' }, { title: 'Beträge kontrollieren', desc: 'Prüfen Sie Mengen, Steuern und Gesamtsummen vor dem Versand.' }, { title: 'Vorgaben prüfen', desc: 'Der Generator bestätigt keine steuerliche oder rechtliche Konformität.' }],
    faq: 'Häufige Fragen', questions: [
      { question: 'Kann ich das Dokument als PDF speichern?', answer: (n) => `Ja. Prüfen Sie die Vorschau und laden Sie den ${n.toLowerCase()} als PDF herunter.` },
      { question: 'Muss ich ein Benutzerkonto anlegen?', answer: () => 'Nein. Sie können ohne Konto ein Dokument erstellen. Gespeicherte Entwürfe bleiben im verwendeten Browser.' },
      { question: 'Ist das Beispiel rechtssicher?', answer: () => 'Es ist ein Geschäftsmuster, keine Rechts- oder Steuerberatung. Lassen Sie die geltenden Anforderungen vor Ort prüfen.' },
    ],
    privacyTitle: 'Datenschutz und Speicherung', privacyDescription: 'Dokumente werden im lokalen Browserspeicher auf diesem Gerät bearbeitet und gespeichert.',
    privacyPoints: ['Exportieren Sie eine Sicherung, bevor Sie Browserdaten löschen.', 'Der lokale Speicher überträgt Ihre Dokumente nicht automatisch auf andere Geräte.'],
    sampleItems: 'Beispielposition', currencyLabel: 'Währung', notesLabel: 'Hinweis zum Beispiel', exampleLead: 'Praxisbeispiel',
    featureRows: [
      { feature: 'Live-Vorschau', benefit: 'Prüfen Sie das Layout vor dem Teilen.' },
      { feature: 'Automatische Berechnung', benefit: 'Behalten Sie Zwischensummen und offene Beträge im Blick.' },
      { feature: 'PDF-Download', benefit: 'Speichern Sie eine druck- und versandfertige Datei.' },
    ],
  },
  pt: {
    guideWord: 'Guia prático',
    stepPrefix: 'Etapa',
    suitableFor: ['Profissionais autônomos que cobram por serviços.', 'Pequenas empresas que registram operações comerciais.', 'Prestadores e fornecedores que organizam serviços e entregas.'],
    intro: (name, description) => [
      `${description} Este guia mostra como preparar um ${name.toLowerCase()} para uma situação comercial do dia a dia.`,
      'Preencha os dados no formulário, confira os valores na prévia e baixe o PDF. Exporte uma cópia dos documentos antes de trocar de navegador ou aparelho.',
      'As obrigações fiscais e comerciais variam conforme a atividade e a legislação aplicável. Confirme as regras locais antes de usar qualquer modelo como documento oficial.',
    ],
    contents: 'Neste guia', overview: 'Para que serve este documento', fit: 'Pode ser útil para:', features: 'Recursos úteis', feature: 'Recurso', benefit: 'Como ajuda',
    stepsTitle: 'Prepare o documento em 5 etapas', stepsLead: (name) => `Use o gerador de ${name.toLowerCase()} para preencher e revisar estes dados:`,
    stepTitles: ['Identifique as partes', 'Crie uma referência', 'Detalhe os itens', 'Informe as condições', 'Confira e baixe o PDF'],
    stepDescriptions: (name) => [`Inclua os dados da sua empresa e do cliente, fornecedor ou destinatário do ${name.toLowerCase()}.`, 'Use uma numeração única para localizar o documento e relacioná-lo ao pedido ou serviço.', 'Descreva cada produto ou serviço, quantidade ou horas e preço unitário.', 'Informe moeda, vencimento, entrega e forma de pagamento quando necessário.', 'Revise nomes, datas, quantidades e totais na prévia antes de baixar o PDF.'],
    layout: 'Escolha um modelo fácil de ler', layoutDescription: (name) => `Para um ${name.toLowerCase()} claro, escolha um modelo simples e mantenha a referência, a data e os valores em destaque.`,
    layoutTips: ['Use descrições e unidades consistentes.', 'Inclua apenas campos úteis para quem recebe.', 'Mantenha o mesmo padrão nos documentos do mesmo tipo.'],
    essentials: 'Confira estes dados antes de enviar', essentialsDescription: 'Revise as informações abaixo e as exigências aplicáveis à sua atividade:',
    checklist: ['Identificação e contato das partes.', 'Referência única e data de emissão.', 'Descrição dos produtos ou serviços e quantidades.', 'Moeda, cálculos e impostos quando aplicáveis.', 'Condições de pagamento, entrega ou aprovação.'],
    numbering: 'Numeração fácil de acompanhar', numberingDescription: 'Uma referência exclusiva ajuda a localizar o documento e relacioná-lo a pedidos, pagamentos ou serviços.',
    numberingExamples: [{ label: 'Série por documento', desc: 'Exemplo: FAT-2026-001 ou PED-2026-001.' }, { label: 'Código de cliente', desc: 'Exemplo: CLI-014-2026-003; não reutilize números.' }],
    examples: 'Exemplo comercial brasileiro', examplesDescription: (name) => `Uma situação de ${name.toLowerCase()} com serviço, valores em reais e detalhes familiares a pequenos negócios no Brasil.`,
    bestPractices: 'Boas práticas', practices: [{ title: 'Exporte uma cópia', desc: 'Faça backup antes de mudar de navegador ou dispositivo.' }, { title: 'Revise os valores', desc: 'Confira quantidades, impostos e total antes de enviar.' }, { title: 'Confirme as regras locais', desc: 'O modelo não garante conformidade fiscal ou jurídica.' }],
    faq: 'Perguntas frequentes', questions: [
      { question: 'Posso baixar o documento em PDF?', answer: (n) => `Sim. Confira a prévia e baixe o ${n.toLowerCase()} em PDF.` },
      { question: 'Preciso criar uma conta?', answer: () => 'Não. Você pode gerar documentos sem cadastro; os arquivos salvos ficam neste navegador.' },
      { question: 'O exemplo atende às regras fiscais?', answer: () => 'É apenas uma referência comercial, não uma orientação contábil. Confira as exigências com a prefeitura, a SEFAZ ou um profissional da sua região.' },
    ],
    privacyTitle: 'Privacidade e armazenamento', privacyDescription: 'Seus documentos são editados e armazenados localmente no navegador deste dispositivo.',
    privacyPoints: ['Exporte um backup antes de limpar os dados do navegador.', 'O armazenamento local não sincroniza documentos entre aparelhos.'],
    sampleItems: 'Itens de exemplo', currencyLabel: 'Moeda', notesLabel: 'Observação do exemplo', exampleLead: 'Situação de exemplo',
    featureRows: [
      { feature: 'Prévia instantânea', benefit: 'Confira a aparência antes de compartilhar.' },
      { feature: 'Cálculos automáticos', benefit: 'Acompanhe subtotais e saldo enquanto preenche.' },
      { feature: 'Download em PDF', benefit: 'Salve uma cópia pronta para imprimir ou enviar.' },
    ],
  },
  it: {
    guideWord: 'Guida pratica',
    stepPrefix: 'Passaggio',
    suitableFor: ['Professionisti indipendenti che fatturano servizi.', 'Piccole imprese che registrano operazioni commerciali.', 'Artigiani e fornitori che gestiscono lavori o consegne.'],
    intro: (name, description) => [
      `${description} Questa guida illustra come preparare un ${name.toLowerCase()} per una situazione commerciale concreta.`,
      'Inserisci i dati nel modulo, controlla gli importi nell’anteprima e scarica il PDF. Esporta una copia dei documenti prima di cambiare dispositivo o browser.',
      'Gli obblighi fiscali e commerciali dipendono dall’attività e dalla giurisdizione. Verifica le regole applicabili prima di usare un esempio come documento ufficiale.',
    ],
    contents: 'In questa guida', overview: 'Funzione e uso del documento', fit: 'Può essere utile per:', features: 'Funzioni disponibili', feature: 'Funzione', benefit: 'Vantaggio',
    stepsTitle: 'Prepara il documento in 5 passaggi', stepsLead: (name) => `Usa il generatore di ${name.toLowerCase()} per inserire e verificare queste informazioni:`,
    stepTitles: ['Inserisci le parti', 'Assegna un riferimento', 'Descrivi le voci', 'Aggiungi condizioni e date', 'Controlla e scarica il PDF'],
    stepDescriptions: (name) => [`Aggiungi i dati della tua attività e quelli di cliente, fornitore o destinatario del ${name.toLowerCase()}.`, 'Assegna un numero univoco per ritrovare il documento e collegarlo alla pratica corretta.', 'Descrivi ogni servizio o prodotto con quantità, ore lavorate e prezzo unitario.', 'Indica valuta, scadenza, consegna e modalità di pagamento se pertinenti.', 'Verifica nomi, date, quantità e totale nell’anteprima prima di scaricare il PDF.'],
    layout: 'Scegli un layout chiaro', layoutDescription: (name) => `Per un ${name.toLowerCase()} facile da consultare, scegli un modello semplice e rendi visibili riferimento, data e importi.`,
    layoutTips: ['Mantieni descrizioni e unità coerenti.', 'Aggiungi solo le informazioni utili al destinatario.', 'Usa uno standard comune per documenti simili.'],
    essentials: 'Dati da verificare prima dell’invio', essentialsDescription: 'Controlla questi dettagli e gli obblighi specifici previsti per la tua attività:',
    checklist: ['Dati identificativi e contatti delle parti.', 'Riferimento univoco e data del documento.', 'Descrizione, quantità e prezzo di beni o servizi.', 'Valuta, calcoli e imposte se applicabili.', 'Termini di pagamento, consegna o accettazione.'],
    numbering: 'Riferimenti semplici da archiviare', numberingDescription: 'Un riferimento univoco aiuta a collegare il documento a ordini, pagamenti, interventi e fatture.',
    numberingExamples: [{ label: 'Serie per anno', desc: 'Esempio: FAT-2026-001 o ORD-2026-001.' }, { label: 'Codice cliente', desc: 'Esempio: CLI-014-2026-003; evita di riutilizzare numeri.' }],
    examples: 'Esempio di attività italiana', examplesDescription: (name) => `Un esempio contestualizzato di ${name.toLowerCase()}, con una situazione e una valuta comuni a una piccola attività italiana.`,
    bestPractices: 'Consigli pratici', practices: [{ title: 'Esporta una copia', desc: 'Fai un backup prima di cambiare browser o dispositivo.' }, { title: 'Controlla gli importi', desc: 'Verifica quantità, imposte e totale prima dell’invio.' }, { title: 'Verifica gli obblighi', desc: 'Il generatore non certifica la conformità fiscale o legale.' }],
    faq: 'Domande frequenti', questions: [
      { question: 'Posso scaricare il documento in PDF?', answer: (n) => `Sì. Controlla l’anteprima e scarica il ${n.toLowerCase()} in PDF.` },
      { question: 'È necessario registrarsi?', answer: () => 'No. Puoi creare un documento senza account; i documenti salvati restano nel browser in uso.' },
      { question: 'L’esempio è conforme alle norme?', answer: () => 'È un esempio commerciale, non una consulenza fiscale o legale. Verifica le regole aggiornate con un professionista.' },
    ],
    privacyTitle: 'Privacy e archiviazione', privacyDescription: 'I documenti vengono modificati e conservati nella memoria locale del browser su questo dispositivo.',
    privacyPoints: ['Esporta una copia prima di cancellare i dati del browser.', 'L’archiviazione locale non sincronizza i documenti tra dispositivi.'],
    sampleItems: 'Voci dell’esempio', currencyLabel: 'Valuta', notesLabel: 'Nota', exampleLead: 'Caso pratico',
    featureRows: [
      { feature: 'Anteprima in tempo reale', benefit: 'Controlla l’aspetto prima di condividere il file.' },
      { feature: 'Calcoli automatici', benefit: 'Tieni sotto controllo subtotali e saldo.' },
      { feature: 'Download PDF', benefit: 'Salva un documento pronto da stampare o inviare.' },
    ],
  },
};

export function getGuideUi(lang: string, toolName = '') {
  const copy = copies[lang];
  if (!copy) {
    return {
      contents: 'In this guide',
      fit: 'It is a good fit if you are:',
      features: 'Key features',
      feature: 'Feature',
      benefit: 'What it means for you',
      stepsLead: 'Follow these steps to prepare this document:',
      exampleLead: 'Practical example',
      sampleItems: 'Example line items',
      currency: 'Currency',
      notes: 'Example notes',
      privacyTitle: 'Privacy: how your data is handled',
      privacyDescription: 'Your documents are edited and stored locally in this browser.',
      privacyPoints: ['Export a backup before clearing browser data.', 'Local storage does not sync documents between devices.'],
      faq: 'Frequently asked questions',
      introduction: 'Complete guide',
    };
  }
  return {
    contents: copy.contents,
    fit: copy.fit,
    features: copy.features,
    feature: copy.feature,
    benefit: copy.benefit,
    stepsLead: copy.stepsLead(toolName),
    exampleLead: copy.exampleLead,
    sampleItems: copy.sampleItems,
    currency: copy.currencyLabel,
    notes: copy.notesLabel,
    privacyTitle: copy.privacyTitle,
    privacyDescription: copy.privacyDescription,
    privacyPoints: copy.privacyPoints,
    faq: copy.faq,
    introduction: copy.guideWord,
    stepPrefix: copy.stepPrefix,
    suitableFor: copy.suitableFor,
  };
}

export function buildLocalizedToolGuide(slug: string, lang: string): Partial<ToolGuideData> | undefined {
  const copy = copies[lang];
  const example = scenarios[lang]?.[slug];
  if (!copy || !example) return undefined;
  const name = i18n.t(`seo:tools.${slug}.name`, { lng: lang, defaultValue: slug.replace(/-generator$/, '').replaceAll('-', ' ') });
  const description = i18n.t(`seo:tools.${slug}.description`, { lng: lang, defaultValue: '' });
  const localizedTitle = i18n.t(`seo:tools.${slug}.h1`, { lng: lang, defaultValue: name });
  const steps = copy.stepTitles.map((title, index) => ({
    title: `${copy.stepPrefix} ${index + 1}: ${title}`,
    description: copy.stepDescriptions(name)[index],
  }));
  return {
    h1: `${copy.guideWord}: ${localizedTitle}`,
    introParagraphs: copy.intro(name, description),
    tableOfContents: [
      { id: 'what-is-tool', label: copy.overview },
      { id: 'key-features', label: copy.features },
      { id: 'how-to-create-tool', label: copy.stepsTitle },
      { id: 'choosing-the-right-template', label: copy.layout },
      { id: 'essential-elements', label: copy.essentials },
      { id: 'localized-examples', label: copy.examples },
      { id: 'best-practices', label: copy.bestPractices },
      { id: 'privacy-data-handling', label: copy.privacyTitle },
      { id: 'faq', label: copy.faq },
    ],
    whatIsTitle: copy.overview,
    whatIsDescription: description,
    goodFitList: copy.suitableFor,
    featuresTable: copy.featureRows,
    stepsTitle: copy.stepsTitle,
    steps,
    templatesSection: { title: copy.layout, description: copy.layoutDescription(name), tips: copy.layoutTips },
    keyElementsSection: { title: copy.essentials, description: copy.essentialsDescription, checklist: copy.checklist },
    numberingSection: { title: copy.numbering, description: copy.numberingDescription, schemes: copy.numberingExamples },
    examplesSection: {
      title: copy.examples,
      description: copy.examplesDescription(name),
      examples: [{
        industry: example.industry,
        headline: example.headline,
        currency: example.currency,
        items: [{
          desc: example.item,
          qty: example.qty,
          rate: example.rate,
          total: example.rate * example.qty,
        }],
        notes: example.note,
      }],
    },
    bestPracticesSection: { title: copy.bestPractices, tips: copy.practices },
    faqs: copy.questions.map((item) => ({ question: item.question, answer: item.answer(name) })),
  };
}
