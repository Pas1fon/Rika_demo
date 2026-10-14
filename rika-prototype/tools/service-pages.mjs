// Official service descriptions reviewed 14 October 2026; sources are recorded in SOURCES.md.
// Public service URLs: /ru/service/dlya-chastnykh-lits/, /pochta-dlya-biznesa/,
// /tarif-ekonom/, /dokumenty-sng-dz/, /posylky-sng-dz/ on https://rika.kz.
const t = (ru, kk, en) => ({ru, kk, en});
const r = (href, ru, kk, en) => ({href, label:t(ru, kk, en)});
const section = (heading, ...paragraphs) => ({heading, paragraphs});
const contact = r('contacts.html', 'Связаться с офисом', 'Кеңсеге хабарласу', 'Contact an office');
const zones = r('delivery-zones.html', 'Зоны доставки', 'Жеткізу аймақтары', 'Delivery coverage');
const calculator = r('calculator.html', 'Тарифный калькулятор', 'Тариф калькуляторы', 'Rate calculator');

export default [
  {
    slug:'service-kazakhstan.html', kind:'service',
    title:t('Доставка по Казахстану', 'Қазақстан бойынша жеткізу', 'Delivery across Kazakhstan'),
    eyebrow:t('Для частных клиентов', 'Жеке клиенттерге', 'For personal shipments'),
    lead:t('Документы и посылки — по городу и между городами. Выберите удобный способ передачи и получения.', 'Құжаттар мен сәлемдемелерді қала ішінде және қалалар арасында жеткізу. Жіберу мен алудың ыңғайлы тәсілін таңдаңыз.', 'Send documents and parcels within a city or between cities. Choose how to hand over and receive your shipment.'),
    facts:[
      {label:t('Передача', 'Тапсыру', 'Handover'), value:t('Пункт или курьер', 'Пункт немесе курьер', 'Service point or courier')},
      {label:t('Расчёт', 'Есептеу', 'Pricing'), value:t('Маршрут + вес', 'Бағыт + салмақ', 'Route + weight')},
      {label:t('Для вас', 'Сіз үшін', 'For you'), value:t('Личные отправления', 'Жеке жөнелтілімдер', 'Personal shipments')}
    ],
    sections:[
      section(t('Как вам удобно', 'Өзіңізге ыңғайлы тәсіл', 'Choose your delivery format'), t('Доступны форматы «ПВЗ–ПВЗ», «ПВЗ–Дверь» и «Дверь–Дверь». Доступность зависит от города и зоны доставки.', '«Пункттен пунктке», «Пункттен есікке» және «Есіктен есікке» нұсқалары бар. Қолжетімділігі қала мен жеткізу аймағына байланысты.', 'Options include point-to-point, point-to-door and door-to-door delivery. Availability depends on the city and delivery area.')),
      section(t('Перед отправкой', 'Жіберер алдында', 'Before sending'), t('Подготовьте адрес и телефон получателя, взвесьте упакованное отправление и измерьте его размеры. Точный маршрут и стоимость подтвердит офис.', 'Алушының мекенжайы мен телефонын дайындап, қапталған жөнелтілімнің салмағы мен өлшемдерін анықтаңыз. Нақты бағыт пен құнын кеңседе растаңыз.', 'Prepare the recipient’s address and phone number, then weigh and measure the packed shipment. Ask the office to confirm the route and price.')),
      section(t('Условия для вашего адреса', 'Сіздің мекенжайыңызға жеткізу', 'Check your address'), t('Для небольших населённых пунктов и нестандартных отправлений условия согласовываются отдельно. Сроки зависят от направления; день приёма не учитывается.', 'Шағын елді мекендер мен стандартты емес жөнелтілімдерге шарттар бөлек келісіледі. Мерзім бағытқа байланысты; қабылдау күні есептелмейді.', 'Small settlements and non-standard shipments require individual confirmation. Transit times depend on the route and exclude the collection day.'))
    ],
    related:[r('courier.html','Вызвать курьера','Курьер шақыру','Arrange collection'), zones, calculator]
  },
  {
    slug:'service-business.html', kind:'service',
    title:t('Доставка для бизнеса', 'Бизнеске арналған жеткізу', 'Delivery for business'),
    eyebrow:t('Для компаний', 'Компанияларға', 'For companies'),
    lead:t('Документы и посылки для рабочих задач: доставка по городу, между городами и в регионы Казахстана.', 'Жұмысқа қажет құжаттар мен сәлемдемелерді қала ішінде, қалалар арасында және Қазақстан өңірлеріне жеткізу.', 'Documents and parcels for your operations, with local, intercity and regional delivery in Kazakhstan.'),
    facts:[
      {label:t('Формат', 'Тәсіл', 'Format'), value:t('Дверь–Дверь', 'Есіктен есікке', 'Door-to-door')},
      {label:t('Сотрудничество', 'Ынтымақтастық', 'Working together'), value:t('По договору', 'Шарт бойынша', 'Under an agreement')},
      {label:t('Направления', 'Бағыттар', 'Destinations'), value:t('Казахстан', 'Қазақстан', 'Kazakhstan')}
    ],
    sections:[
      section(t('Начните с маршрутов', 'Бағыттардан бастаңыз', 'Start with your routes'), t('Сообщите менеджеру города отправления и получения, примерный вес и частоту отправок. Эти данные помогут обсудить подходящие условия.', 'Менеджерге жөнелту және қабылдау қалаларын, шамамен салмақ пен жіберу жиілігін айтыңыз. Бұл мәліметтер қолайлы шарттарды талқылауға көмектеседі.', 'Tell the manager your origin and destination cities, typical weight and shipping frequency. These details help you discuss suitable arrangements.')),
      section(t('Договор и документы', 'Шарт пен құжаттар', 'Agreement and paperwork'), t('В разделе заключения договора собрана информация для начала сотрудничества. Работа с действующей учётной записью остаётся в отдельном личном кабинете.', 'Шарт жасасу бөлімінде ынтымақтастықты бастауға арналған ақпарат бар. Қолданыстағы тіркелгімен жұмыс бөлек жеке кабинетте жалғасады.', 'The agreement page explains how to begin. Existing account operations remain available in the separate customer portal.')),
      section(t('Обновление тарифов', 'Тарифтердің жаңаруы', 'Rate update'), t('РИКА объявила изменение тарифов для юридических лиц с 15 октября 2026 года. Перед отправкой подтвердите действующую стоимость в офисе.', 'РИКА заңды тұлғаларға арналған тарифтердің 2026 жылғы 15 қазаннан бастап өзгеретінін хабарлады. Жіберер алдында кеңседен қолданыстағы құнын нақтылаңыз.', 'RIKA has announced a rate change for legal entities from 15 October 2026. Confirm the applicable price with an office before shipping.'))
    ],
    related:[r('contract.html','Заключить договор','Шарт жасасу','Arrange an agreement'),r('clients.html','Информация для клиентов','Клиенттерге ақпарат','Customer information'),r('tariffs.html','Тарифы и расчёт','Тарифтер мен есептеу','Rates and pricing')]
  },
  {
    slug:'service-economy.html', kind:'service',
    title:t('Эконом-доставка', 'Үнемді жеткізу', 'Economy delivery'),
    eyebrow:t('Специальный тариф', 'Арнайы тариф', 'Special service'),
    lead:t('Для отправлений между Алматы, Карагандой и Астаной, когда можно запланировать доставку заранее.', 'Алматы, Қарағанды және Астана арасында жеткізуді алдын ала жоспарлауға болатын жөнелтілімдер үшін.', 'For shipments between Almaty, Karaganda and Astana when delivery can be planned ahead.'),
    facts:[
      {label:t('Маршруты', 'Бағыттар', 'Routes'), value:t('3 города', '3 қала', '3 cities')},
      {label:t('Опубликованный срок', 'Жарияланған мерзім', 'Published transit time'), value:t('7–10 рабочих дней', '7–10 жұмыс күні', '7–10 business days')},
      {label:t('Территория', 'Аумақ', 'Coverage'), value:t('В пределах города', 'Қала шегінде', 'Within city limits')}
    ],
    sections:[
      section(t('Три направления', 'Үш бағыт', 'Three connections'), t('Алматы ↔ Астана, Астана ↔ Караганда, Алматы ↔ Караганда. Услуга действует в обоих направлениях.', 'Алматы ↔ Астана, Астана ↔ Қарағанды, Алматы ↔ Қарағанды. Қызмет екі бағытта да қолжетімді.', 'Almaty ↔ Astana, Astana ↔ Karaganda and Almaty ↔ Karaganda. The service operates in both directions.')),
      section(t('Тяжёлые и крупные отправления', 'Ауыр және ірі жөнелтілімдер', 'Heavy or large shipments'), t('Для тяжёлых и крупногабаритных отправлений предусмотрены особые условия. Погрузка и разгрузка отправлений свыше 50 кг не включены. Согласуйте детали с офисом.', 'Ауыр және ірі жөнелтілімдерге арнайы шарттар қолданылады. Салмағы 50 кг-нан асатын жөнелтілімдерді тиеу мен түсіру құнға кірмейді. Мәліметтерді кеңсемен келісіңіз.', 'Heavy and oversized shipments have special conditions. Loading and unloading shipments over 50 kg are not included. Confirm the details with an office.')),
      section(t('Планируйте заранее', 'Алдын ала жоспарлаңыз', 'Plan ahead'), t('Подготовьте вес, размеры и адреса обеих сторон. Опубликованный срок носит справочный характер — конкретную отправку нужно согласовать.', 'Салмақты, өлшемдерді және екі тараптың мекенжайларын дайындаңыз. Жарияланған мерзім анықтамалық сипатта; нақты жөнелтілімді келісу қажет.', 'Have the weight, dimensions and both addresses ready. The published transit time is a reference; confirm your specific shipment.'))
    ],
    related:[contact, calculator, r('service-kazakhstan.html','Экспресс-доставка','Экспресс-жеткізу','Express delivery')]
  },
  {
    slug:'service-documents.html', kind:'service',
    title:t('Документы за рубеж', 'Құжаттарды шетелге жеткізу', 'Documents abroad'),
    eyebrow:t('СНГ и дальнее зарубежье', 'ТМД және алыс шетел', 'CIS and international delivery'),
    lead:t('Международная доставка бумажной корреспонденции. Страна назначения и тип вложения определяют условия отправки.', 'Қағаз хат-хабарды халықаралық жеткізу. Шарттар алушы елге және жөнелтілім мазмұнына байланысты.', 'International delivery of paper correspondence. The destination country and contents determine the shipping conditions.'),
    facts:[
      {label:t('Категория документов', 'Құжаттар санаты', 'Document category'), value:t('Бумага А4, до 1 кг', 'А4 қағазы, 1 кг-ға дейін', 'A4 paper, up to 1 kg')},
      {label:t('Опубликованный срок', 'Жарияланған мерзім', 'Published transit time'), value:t('8–16 рабочих дней', '8–16 жұмыс күні', '8–16 business days')},
      {label:t('Стоимость', 'Құны', 'Price'), value:t('По весу и зоне', 'Салмақ пен аймаққа сай', 'By weight and zone')}
    ],
    sections:[
      section(t('Что считается документами', 'Құжаттарға не жатады', 'What counts as documents'), t('В опубликованных условиях это бумажная корреспонденция формата А4 весом до 1 кг. При большем весе применяется категория посылки.', 'Жарияланған шарттар бойынша бұл салмағы 1 кг-ға дейінгі А4 форматындағы қағаз хат-хабар. Салмағы артық болса, сәлемдеме санаты қолданылады.', 'The published conditions define documents as A4 paper correspondence weighing up to 1 kg. Heavier items use the parcel category.')),
      section(t('Проверьте вложение', 'Мазмұнын нақтылаңыз', 'Check the contents'), t('Перед отправкой оригиналов удостоверяющих личность или правоустанавливающих документов уточните категорию и условия у менеджера.', 'Жеке басты немесе құқықты растайтын құжаттардың түпнұсқаларын жіберер алдында санаты мен шарттарын менеджерден нақтылаңыз.', 'Before sending original identity or title documents, confirm their shipping category and conditions with a manager.')),
      section(t('Как считаются сроки', 'Мерзім қалай есептеледі', 'How transit time is counted'), t('День забора, выходные и праздники страны отправления или доставки не учитываются. Срок для конкретного адреса подтвердит офис.', 'Қабылдау күні, жөнелтуші не алушы елдің демалыс және мереке күндері есептелмейді. Нақты мекенжайға жеткізу мерзімін кеңсе растайды.', 'Collection day, weekends and holidays in the origin or destination country are excluded. Ask the office to confirm the timing for your address.'))
    ],
    related:[contact,r('service-international.html','Международные посылки','Халықаралық сәлемдемелер','International parcels'),r('clients.html','Подготовка к отправке','Жіберуге дайындық','Prepare your shipment')]
  },
  {
    slug:'service-international.html', kind:'service',
    title:t('Международные посылки', 'Халықаралық сәлемдемелер', 'International parcels'),
    eyebrow:t('СНГ и дальнее зарубежье', 'ТМД және алыс шетел', 'CIS and international delivery'),
    lead:t('Отправка вещей и товаров за рубеж начинается с проверки направления, вложения и размеров посылки.', 'Заттар мен тауарларды шетелге жөнелту бағытты, мазмұнды және сәлемдеме өлшемдерін тексеруден басталады.', 'Sending items abroad begins with checking the destination, contents and parcel dimensions.'),
    facts:[
      {label:t('Опубликованный срок', 'Жарияланған мерзім', 'Published transit time'), value:t('8–16 рабочих дней', '8–16 жұмыс күні', '8–16 business days')},
      {label:t('Адрес', 'Мекенжай', 'Address'), value:t('Без абонентских ящиков', 'Абоненттік жәшікке емес', 'No PO boxes')},
      {label:t('Импорт', 'Импорт', 'Imports'), value:t('По запросу', 'Сұрау бойынша', 'Quoted on request')}
    ],
    sections:[
      section(t('Сначала — направление', 'Алдымен — бағыт', 'Check the destination first'), t('Стоимость зависит от тарифной зоны и расчётного веса. В Таджикистан и Туркменистан по опубликованным условиям принимаются только документы.', 'Құны тарифтік аймақ пен есептік салмаққа байланысты. Жарияланған шарттарға сай Тәжікстан мен Түрікменстанға тек құжаттар қабылданады.', 'Prices depend on the tariff zone and chargeable weight. Under the published conditions, only documents are accepted for Tajikistan and Turkmenistan.')),
      section(t('Подготовьте описание', 'Сипаттамасын дайындаңыз', 'Prepare a description'), t('Для консультации укажите страну, город, содержимое, вес и размеры упаковки. Уточните у офиса допустимость вложения и требуемые сопроводительные документы.', 'Кеңес алу үшін елді, қаланы, мазмұнын, салмағын және қаптама өлшемдерін көрсетіңіз. Жөнелту мүмкіндігі мен ілеспе құжаттарды кеңседен нақтылаңыз.', 'For a consultation, provide the country, city, contents, weight and package dimensions. Ask the office to confirm acceptance and required accompanying paperwork.')),
      section(t('Согласуйте отправку', 'Жөнелтуді келісіңіз', 'Confirm before sending'), t('Срок 8–16 рабочих дней указан без дня забора, выходных и праздников. Импортные и нестандартные отправления рассчитываются по запросу.', '8–16 жұмыс күніне қабылдау күні, демалыс және мереке күндері кірмейді. Импорттық және стандартты емес жөнелтілімдер сұрау бойынша есептеледі.', 'The 8–16 business-day reference excludes collection day, weekends and holidays. Imports and non-standard shipments are quoted on request.'))
    ],
    related:[contact,r('service-documents.html','Доставка документов','Құжаттарды жеткізу','Document delivery'),r('clients.html','Информация для клиентов','Клиенттерге ақпарат','Customer information')]
  },
  {
    slug:'tariffs.html', kind:'service',
    title:t('Тарифы и стоимость', 'Тарифтер мен жеткізу құны', 'Rates and shipping costs'),
    eyebrow:t('Понятный расчёт', 'Түсінікті есептеу', 'Understand your price'),
    lead:t('На стоимость влияют маршрут, формат доставки, вес и размеры отправления. Здесь собраны ориентиры для подготовки расчёта.', 'Құнға бағыт, жеткізу тәсілі, жөнелтілімнің салмағы мен өлшемдері әсер етеді. Мұнда есептеуге дайындалуға арналған ақпарат берілген.', 'Your route, delivery format, weight and dimensions affect the price. Use this guide to prepare for a quote.'),
    facts:[
      {label:t('1. Направление', '1. Бағыт', '1. Route'), value:t('Откуда и куда', 'Қайдан және қайда', 'Origin and destination')},
      {label:t('2. Отправление', '2. Жөнелтілім', '2. Shipment'), value:t('Вес и размеры', 'Салмақ пен өлшемдер', 'Weight and dimensions')},
      {label:t('3. Условия', '3. Шарттар', '3. Service'), value:t('Формат доставки', 'Жеткізу тәсілі', 'Delivery format')}
    ],
    sections:[
      section(t('Что влияет на цену', 'Бағаға не әсер етеді', 'What affects the price'), t('Подготовьте города и точные адреса, фактический вес в упаковке, длину, ширину и высоту каждого места. Укажите, отправляете ли вы документы или посылку и нужен ли забор курьером.', 'Қалалар мен нақты мекенжайларды, қаптамадағы салмақты, әр орынның ұзындығын, енін және биіктігін дайындаңыз. Құжат па, сәлемдеме ме және курьер қажет пе — соны көрсетіңіз.', 'Have the cities, full addresses, packed weight and each package’s length, width and height ready. Specify whether you are sending documents or a parcel and need courier collection.')),
      section(t('Объёмный вес', 'Көлемдік салмақ', 'Volumetric weight'), t('На сайте РИКА приведена формула: длина × ширина × высота в сантиметрах / 5000. Для расчёта сравнивают объёмный и фактический вес; применимость правил к вашей упаковке уточняет офис.', 'РИКА сайтындағы формула: сантиметрмен алынған ұзындық × ен × биіктік / 5000. Есептеу үшін көлемдік және нақты салмақ салыстырылады; қаптамаңызға қолданылатын ережені кеңсе нақтылайды.', 'RIKA publishes this formula: length × width × height in centimetres / 5000. Volumetric and actual weights are compared; the office confirms the rules for your packaging.')),
      section(t('Изменение с 15 октября 2026', '2026 жылғы 15 қазандағы өзгеріс', 'Change from 15 October 2026'), t('Объявлено обновление тарифов по Казахстану для юридических лиц. Перед оформлением отправления уточните, какая редакция тарифа применяется на дату приёма.', 'Қазақстан бойынша заңды тұлғаларға арналған тарифтердің жаңаруы жарияланды. Жөнелтімді рәсімдеу алдында қабылдау күні қолданылатын тарифті нақтылаңыз.', 'An update to Kazakhstan rates for legal entities has been announced. Before booking, confirm which rate version applies on the collection date.')),
      section(t('Где рассчитать стоимость', 'Құнын қайда есептеуге болады', 'Where to calculate your price'), t('Таблица — справочный снимок опубликованных тарифов для частных лиц на 14 октября 2026 года. Стоимость и условия для вашей отправки требуют подтверждения офисом. На странице калькулятора доступен действующий сервис Courierexe. Отдельный локальный деморасчёт предназначен только для знакомства с интерфейсом.', 'Кесте — 2026 жылғы 14 қазанда жарияланған жеке тұлғалар тарифтерінің анықтамалық көшірмесі. Жөнелтіліміңіздің құны мен шарттарын кеңседе растау қажет. Калькулятор бетінде қолданыстағы Courierexe сервисі бар. Бөлек жергілікті демоесептеу тек интерфейспен танысуға арналған.', 'The table is a reference snapshot of published personal-shipment rates as of 14 October 2026. An office must confirm the price and conditions for your shipment. The calculator page provides the live Courierexe service. A separate local demo calculation is available only to explore the interface.'))
    ],
    related:[calculator, contact, zones]
  }
];
