// Concise editorial summaries of the public RIKA pages; reviewed 14 October 2026.
// Source URLs are documented in the project SOURCES.md, outside the website navigation.
const t = (ru, kk, en) => ({ ru, kk, en });
const s = (heading, ...paragraphs) => ({ heading, paragraphs });
const link = (href, ru, kk, en) => ({ href, label: t(ru, kk, en) });
const company = t('О компании', 'Компания туралы', 'About RIKA');
const information = t('Полезная информация', 'Пайдалы ақпарат', 'Useful information');
const news = t('Новости РИКА', 'РИКА жаңалықтары', 'RIKA news');

export default [
  {
    slug: 'about.html',
    title: t('Доставка, которая соединяет', 'Байланыс орнататын жеткізу', 'Delivery that connects'),
    eyebrow: company,
    lead: t('РИКА доставляет документы и посылки по Казахстану и за его пределами с 1996 года.', 'РИКА 1996 жылдан бері Қазақстан бойынша және шетелге құжаттар мен сәлемдемелер жеткізеді.', 'RIKA has delivered documents and parcels across Kazakhstan and internationally since 1996.'),
    facts: [
      { label: t('Начало работы', 'Құрылған жылы', 'Founded'), value: t('1996 год', '1996 жыл', '1996') },
      { label: t('Международная сеть', 'Халықаралық желі', 'International network'), value: t('190+ стран', '190+ ел', '190+ countries') },
      { label: t('По Казахстану', 'Қазақстан бойынша', 'Across Kazakhstan'), value: t('Областные центры', 'Облыс орталықтары', 'Regional capitals') }
    ],
    sections: [
      s(t('Для личных и деловых отправлений', 'Жеке және іскерлік жөнелтілімдер', 'For people and businesses'), t('Компания работает с частными отправителями, организациями и предпринимателями. В сети доступны внутренняя и международная экспресс-доставка.', 'Компания жеке жөнелтушілермен, ұйымдармен және кәсіпкерлермен жұмыс істейді. Ел ішінде және халықаралық экспресс жеткізу қызметтері бар.', 'The company serves individuals, organisations and businesses through domestic and international express delivery.')),
      s(t('Выберите свой маршрут', 'Бағытыңызды таңдаңыз', 'Find your route'), t('Посмотрите услуги и зоны доставки, затем уточните условия у офиса. Срок и стоимость зависят от направления и параметров отправления.', 'Қызметтер мен жеткізу аймақтарын қарап, шарттарды кеңседен нақтылаңыз. Мерзім мен құн бағытқа және жөнелтілім параметрлеріне байланысты.', 'Explore services and delivery areas, then confirm the details with an office. Timing and price depend on the route and shipment.'))
    ],
    related: [link('history.html', 'История компании', 'Компания тарихы', 'Our history'), link('mission.html', 'Миссия и видение', 'Миссия және көзқарас', 'Mission and vision'), link('values.html', 'Наши ценности', 'Құндылықтарымыз', 'Our values'), link('services.html', 'Выбрать услугу', 'Қызметті таңдау', 'Explore services')]
  },
  {
    slug: 'history.html',
    title: t('30 лет в движении', '30 жылдық жол', '30 years on the move'),
    eyebrow: company,
    lead: t('От небольшого офиса до сети в областных центрах Казахстана.', 'Шағын кеңседен Қазақстанның облыс орталықтарындағы желіге дейін.', 'From a small office to a network across Kazakhstan’s regional capitals.'),
    facts: [{ label: t('Компания основана', 'Компания құрылды', 'Company founded'), value: t('1996', '1996', '1996') }, { label: t('Первоначальная команда', 'Алғашқы команда', 'Initial team'), value: t('2 человека', '2 адам', '2 people') }],
    sections: [
      s(t('1996 · первые отправления', '1996 · алғашқы жөнелтілімдер', '1996 · the beginning'), t('РИКА начала работу в небольшом офисе с командой из двух человек. Компания развивалась вместе с казахстанским рынком логистики.', 'РИКА екі адамнан тұратын командамен шағын кеңседе жұмысын бастады. Компания Қазақстанның логистика нарығымен бірге дамыды.', 'RIKA began in a small office with two people, growing alongside Kazakhstan’s logistics market.')),
      s(t('2026 · сеть по стране', '2026 · елдегі желі', '2026 · a national network'), t('В официальной истории компания отмечает 30-летний путь и представительства во всех областных центрах Казахстана.', 'Ресми тарихында компания 30 жылдық жолын және Қазақстанның барлық облыс орталықтарындағы өкілдіктерін атап өтеді.', 'The company’s published history marks 30 years of development and representation in every regional capital of Kazakhstan.'))
    ],
    related: [link('about.html', 'О компании', 'Компания туралы', 'About RIKA'), link('contacts.html', 'Найти офис', 'Кеңсені табу', 'Find an office')]
  },
  {
    slug: 'mission.html',
    title: t('Сближать людей', 'Адамдарды жақындастыру', 'Bringing people closer'),
    eyebrow: t('Миссия и видение', 'Миссия және көзқарас', 'Mission and vision'),
    lead: t('За каждым отправлением — человек, важное решение или новый проект.', 'Әр жөнелтілімнің артында адам, маңызды шешім немесе жаңа жоба бар.', 'Every shipment connects a person, an important decision or a new project.'),
    sections: [
      s(t('Наша миссия', 'Біздің миссиямыз', 'Our mission'), t('РИКА видит свою задачу в том, чтобы помогать людям поддерживать связь и компаниям развиваться через доставку документов и отправлений.', 'РИКА өз міндетін құжаттар мен жөнелтілімдерді жеткізу арқылы адамдардың байланысын сақтауға және компаниялардың дамуына көмектесуден көреді.', 'RIKA’s mission is to help people stay connected and businesses grow by delivering their documents and shipments.')),
      s(t('Наше видение', 'Біздің көзқарасымыз', 'Our vision'), t('В основе развития компании — успех клиентов, уважение и доверие. Логистика помогает обмениваться информацией и воплощать планы в жизнь.', 'Компания дамуының негізі — клиенттердің табысы, құрмет және сенім. Логистика ақпарат алмасуға және жоспарларды жүзеге асыруға көмектеседі.', 'Client success, respect and trust guide the company’s development. Logistics helps people exchange information and turn plans into reality.'))
    ],
    related: [link('values.html', 'Наши ценности', 'Құндылықтарымыз', 'Our values'), link('about.html', 'О компании', 'Компания туралы', 'About RIKA')]
  },
  {
    slug: 'values.html',
    title: t('Основа долгих отношений', 'Ұзақ қарым-қатынастың негізі', 'Built for lasting relationships'),
    eyebrow: t('Ценности РИКА', 'РИКА құндылықтары', 'RIKA values'),
    lead: t('Четыре принципа, опубликованные компанией: надёжность, внимание к клиенту, доверие и честность.', 'Компания жариялаған төрт қағида: сенімділік, клиентке көңіл бөлу, сенім және адалдық.', 'Four principles published by the company: reliability, customer focus, trust and honesty.'),
    sections: [
      s(t('Надёжность', 'Сенімділік', 'Reliability'), t('Бережное отношение к отправлению и согласованным условиям доставки.', 'Жөнелтілімге ұқыпты қарау және келісілген жеткізу шарттарына мән беру.', 'Care for each shipment and the agreed delivery arrangements.')),
      s(t('Внимание к клиенту', 'Клиентке көңіл бөлу', 'Customer focus'), t('Потребности отправителя и получателя — ориентир при организации услуг.', 'Қызметті ұйымдастыруда жөнелтуші мен алушының қажеттіліктерін ескеру.', 'Sender and recipient needs guide how services are organised.')),
      s(t('Доверие и честность', 'Сенім және адалдық', 'Trust and honesty'), t('Открытость в общении с клиентами и партнёрами поддерживает долгосрочное сотрудничество.', 'Клиенттермен және серіктестермен ашық қарым-қатынас ұзақ мерзімді ынтымақтастықты қолдайды.', 'Open communication with clients and partners supports lasting cooperation.'))
    ],
    related: [link('mission.html', 'Миссия и видение', 'Миссия және көзқарас', 'Mission and vision'), link('contacts.html', 'Связаться с нами', 'Бізбен байланысу', 'Contact us')]
  },
  {
    slug: 'clients.html',
    title: t('Подготовьте отправление', 'Жөнелтілімді дайындаңыз', 'Prepare your shipment'),
    eyebrow: information,
    lead: t('Короткая памятка для удобной передачи документов или посылки курьеру.', 'Құжаттарды немесе сәлемдемені курьерге ыңғайлы тапсыруға арналған қысқа нұсқаулық.', 'A short checklist for handing your documents or parcel to a courier.'),
    sections: [
      s(t('01 · Соберите данные', '01 · Деректерді жинаңыз', '01 · Gather the details'), t('Наш совет по подготовке: запишите города, полные адреса, имена и телефоны отправителя и получателя. Измерьте и взвесьте упакованное отправление.', 'Дайындық бойынша кеңесіміз: қалаларды, толық мекенжайларды, жөнелтуші мен алушының аты-жөні мен телефонын жазыңыз. Қапталған жөнелтілімнің өлшемін және салмағын анықтаңыз.', 'Preparation tip: note the cities, full addresses, names and phone numbers for sender and recipient. Measure and weigh the packed shipment.')),
      s(t('02 · Уточните содержимое', '02 · Ішіндегісін нақтылаңыз', '02 · Check the contents'), t('До передачи сообщите офису, что находится внутри. Для международного направления заранее уточните документы и ограничения. Эта памятка не заменяет правила перевозки.', 'Тапсырар алдында кеңсеге ішіндегісін хабарлаңыз. Халықаралық бағыт үшін құжаттар мен шектеулерді алдын ала нақтылаңыз. Бұл нұсқаулық тасымалдау ережелерін алмастырмайды.', 'Tell the office what is inside before handover. For international routes, confirm documents and restrictions in advance. This checklist does not replace carriage rules.')),
      s(t('03 · Согласуйте передачу', '03 · Тапсыруды келісіңіз', '03 · Arrange handover'), t('Выберите офис или вызов курьера. Сохраните номер накладной для отслеживания. В прототипе заявки не отправляются: реальную передачу согласуйте по телефону.', 'Кеңсені таңдаңыз немесе курьер шақырыңыз. Бақылау үшін жүкқұжат нөмірін сақтаңыз. Прототип өтінім жібермейді: нақты тапсыруды телефон арқылы келісіңіз.', 'Choose an office or courier collection. Keep your waybill number for tracking. This prototype sends no requests: arrange actual handover by phone.'))
    ],
    related: [link('courier.html', 'Вызвать курьера', 'Курьер шақыру', 'Book a courier'), link('extra-services.html', 'Дополнительные услуги', 'Қосымша қызметтер', 'Additional services'), link('contract.html', 'Заключить договор', 'Шарт жасасу', 'Arrange a contract')]
  },
  {
    slug: 'contract.html',
    title: t('Доставка для вашего бизнеса', 'Бизнесіңізге арналған жеткізу', 'Delivery for your business'),
    eyebrow: t('Заключение договора', 'Шарт жасасу', 'Business contracts'),
    lead: t('Подготовьте реквизиты и согласуйте договор со специалистом РИКА.', 'Деректемелерді дайындап, шартты РИКА маманымен келісіңіз.', 'Prepare your company details and arrange a contract with a RIKA specialist.'),
    sections: [
      s(t('Какие данные нужны', 'Қандай деректер қажет', 'Details to prepare'), t('Название организации, БИН, руководитель и основание полномочий, юридический и фактический адреса, контакты и банковские реквизиты.', 'Ұйым атауы, БСН, басшы және өкілеттік негізі, заңды және нақты мекенжайлар, байланыс пен банк деректемелері.', 'Company name, business identification number, authorised signatory, legal and operating addresses, contact and bank details.')),
      s(t('Связаться со специалистом', 'Маманмен байланысу', 'Speak to a specialist'), t('На странице договора указаны tse21@rika.kz и +7 701 309 6808. Запросите актуальные документы и порядок подписания.', 'Шарт бетінде tse21@rika.kz және +7 701 309 6808 көрсетілген. Өзекті құжаттар мен қол қою тәртібін сұраңыз.', 'The contract page lists tse21@rika.kz and +7 701 309 6808. Request current documents and signing instructions.')),
      s(t('В демонстрационной версии', 'Демонстрациялық нұсқада', 'In this prototype'), t('Данные не собираются и договор не оформляется. Свяжитесь с компанией напрямую.', 'Деректер жиналмайды, шарт рәсімделмейді. Компаниямен тікелей байланысыңыз.', 'No details are collected and no contract is created. Contact the company directly.'))
    ],
    related: [link('clients.html', 'Подготовить отправление', 'Жөнелтілімді дайындау', 'Prepare a shipment'), link('contacts.html', 'Контакты офисов', 'Кеңсе байланыстары', 'Office contacts')]
  },
  {
    slug: 'extra-services.html',
    title: t('Когда нужно больше доставки', 'Жеткізуден бөлек қызметтер', 'When you need more than delivery'),
    eyebrow: t('Дополнительные услуги', 'Қосымша қызметтер', 'Additional services'),
    lead: t('Подтверждение вручения, переадресация, упаковка и другие опции для вашего отправления.', 'Тапсыруды растау, басқа мекенжайға бағыттау, қаптау және басқа мүмкіндіктер.', 'Delivery confirmation, redirection, packaging and other shipment options.'),
    sections: [
      s(t('Подтверждение доставки', 'Жеткізуді растау', 'Proof of delivery'), t('Можно запросить копию расписки или возврат её оригинала. Информация из архива предоставляется по письменному запросу.', 'Қолхат көшірмесін немесе түпнұсқасын қайтаруды сұрауға болады. Мұрағат ақпараты жазбаша сұрау бойынша беріледі.', 'You can request a receipt copy or return of the original. Archive information requires a written request.')),
      s(t('Изменения и особые условия', 'Өзгерістер және ерекше шарттар', 'Changes and special arrangements'), t('Опубликованы услуги переадресации, возврата, дополнительных попыток вручения, срочной доставки и вручения лично получателю.', 'Басқа мекенжайға бағыттау, қайтару, қосымша тапсыру әрекеттері, жедел жеткізу және алушыға жеке тапсыру қызметтері жарияланған.', 'Published options include redirection, returns, additional delivery attempts, urgent delivery and personal handover.')),
      s(t('Стоимость уточните заранее', 'Құнын алдын ала нақтылаңыз', 'Confirm the price first'), t('Доплаты зависят от выбранной опции. Условия, доступность и упаковку согласуйте с офисом до передачи отправления.', 'Қосымша төлем таңдалған қызметке байланысты. Шарттарды, қолжетімділікті және қаптауды жөнелтілімді тапсыруға дейін кеңсемен келісіңіз.', 'Charges depend on the option. Confirm terms, availability and packaging with the office before handover.'))
    ],
    related: [link('contacts.html', 'Уточнить условия', 'Шарттарды нақтылау', 'Confirm the details'), link('services.html', 'Все услуги', 'Барлық қызметтер', 'All services')]
  },
  {
    slug: 'news-courier.html', kind: 'article', date: '2026-10-12',
    title: t('Временный сбой вызова курьера', 'Курьер шақырудағы уақытша ақау', 'Temporary courier booking issue'),
    eyebrow: news,
    lead: t('В сообщении от 12 октября РИКА просит оформлять вызов через местный офис.', '12 қазандағы хабарламада РИКА курьерді жергілікті кеңсе арқылы шақыруды сұрайды.', 'In its 12 October notice, RIKA asks customers to arrange collection through their local office.'),
    sections: [
      s(t('Что произошло', 'Не болды', 'What happened'), t('Компания сообщила, что заявки из формы временно не поступают сотрудникам. Это состояние на дату публикации, а не подтверждение текущей неисправности.', 'Компания формадағы өтінімдердің қызметкерлерге уақытша жетпейтінін хабарлады. Бұл жарияланған күндегі жағдай; ағымдағы ақауды растау емес.', 'The company reported that form requests were temporarily not reaching staff. This describes the publication date, not a verified current outage.')),
      s(t('Как оформить вызов', 'Қалай шақыру керек', 'How to book'), t('Позвоните в офис своего города. Если уже отправили заявку без подтверждения, уточните её по телефону. Прототип заявки не отправляет.', 'Қалаңыздағы кеңсеге қоңырау шалыңыз. Өтінім жіберіп, растау алмасаңыз, телефон арқылы нақтылаңыз. Прототип өтінім жібермейді.', 'Call your local office. If you submitted a request without confirmation, check by phone. This prototype does not send requests.'))
    ],
    related: [link('contacts.html', 'Найти телефон офиса', 'Кеңсе телефонын табу', 'Find an office number'), link('news.html', 'Все новости', 'Барлық жаңалықтар', 'All news')]
  },
  {
    slug: 'news-tariffs.html', kind: 'article', date: '2026-09-30',
    title: t('Изменение тарифов для бизнеса', 'Бизнес тарифтерінің өзгеруі', 'Business tariff update'),
    eyebrow: news,
    lead: t('РИКА объявила изменение тарифов по Казахстану для юридических лиц с 15 октября 2026 года.', 'РИКА заңды тұлғалар үшін Қазақстан бойынша тарифтер 2026 жылғы 15 қазаннан өзгеретінін жариялады.', 'RIKA announced updated domestic tariffs for legal entities effective 15 October 2026.'),
    facts: [{ label: t('Дата вступления', 'Күшіне ену күні', 'Effective date'), value: t('15.10.2026', '15.10.2026', '15 October 2026') }, { label: t('Кому относится', 'Кімге қатысты', 'Applies to'), value: t('Юридическим лицам', 'Заңды тұлғаларға', 'Legal entities') }],
    sections: [
      s(t('Планируете отправку', 'Жөнелтуді жоспарласаңыз', 'Planning a shipment'), t('Для отправлений с указанной даты запросите актуальную стоимость у своего офиса или менеджера.', 'Осы күннен бастап жөнелтілімдер үшін өзекті құнды кеңседен немесе менеджерден сұраңыз.', 'For shipments from that date, ask your office or account manager for the applicable price.')),
      s(t('Где рассчитать стоимость', 'Құнын қайда есептеуге болады', 'Where to calculate your price'), t('На странице калькулятора встроен действующий сервис Courierexe. Отдельно можно открыть локальный демоинтерфейс без интернета: его условный расчёт не является тарифом РИКА или коммерческим предложением.', 'Калькулятор бетіне қолданыстағы Courierexe сервисі енгізілген. Интернетсіз жұмыс істейтін жергілікті демоинтерфейсті бөлек ашуға болады: оның шартты есебі РИКА тарифі немесе коммерциялық ұсыныс емес.', 'The calculator page embeds the live Courierexe service. A separate local demo works offline; its illustrative calculation is not a RIKA tariff or commercial offer.'))
    ],
    related: [link('services.html', 'Услуги доставки', 'Жеткізу қызметтері', 'Delivery services'), link('contacts.html', 'Уточнить тариф', 'Тарифті нақтылау', 'Confirm a tariff'), link('news.html', 'Все новости', 'Барлық жаңалықтар', 'All news')]
  },
  {
    slug: 'news-shymkent.html', kind: 'article', date: '2026-09-29',
    title: t('Новый пункт в Шымкенте', 'Шымкенттегі жаңа пункт', 'New Shymkent service point'),
    eyebrow: news,
    lead: t('Компания объявила открытие пункта приёма и выдачи 5 октября 2026 года.', 'Компания қабылдау және беру пунктінің 2026 жылғы 5 қазанда ашылатынын жариялады.', 'The company announced a collection and drop-off point opening on 5 October 2026.'),
    facts: [{ label: t('Адрес', 'Мекенжай', 'Address'), value: t('ул. Орынбай акына, 178/2', 'Орынбай ақын көш., 178/2', '178/2 Orynbay Akyn Street') }, { label: t('График по объявлению', 'Хабарламадағы кесте', 'Published hours'), value: t('Ежедневно 09:00–21:00', 'Күн сайын 09:00–21:00', 'Daily 09:00–21:00') }],
    sections: [
      s(t('Больше удобных точек', 'Ыңғайлы орындар көбейді', 'More convenient access'), t('В новости от 29 сентября указан новый адрес: Шымкент, улица Орынбай акына, 178/2.', '29 қыркүйектегі жаңалықта жаңа мекенжай көрсетілген: Шымкент, Орынбай ақын көшесі, 178/2.', 'The 29 September announcement gives the new address as 178/2 Orynbay Akyn Street, Shymkent.')),
      s(t('Перед визитом', 'Бармас бұрын', 'Before visiting'), t('Опубликованный график — ежедневно с 09:00 до 21:00. Рекомендуем уточнить работу пункта и готовность отправления по телефону.', 'Жарияланған кесте — күн сайын 09:00–21:00. Пункттің жұмысын және жөнелтілімнің дайындығын телефон арқылы нақтылауды ұсынамыз.', 'Published hours are 09:00–21:00 daily. We recommend confirming opening hours and shipment availability by phone.'))
    ],
    related: [link('contacts.html', 'Офисы и пункты', 'Кеңселер мен пункттер', 'Offices and service points'), link('news.html', 'Все новости', 'Барлық жаңалықтар', 'All news')]
  },
  {
    slug: 'news-phone.html', kind: 'article', date: '2026-09-10',
    title: t('Новый телефон пункта в Астане', 'Астанадағы пункттің жаңа телефоны', 'Updated Astana service point number'),
    eyebrow: news,
    lead: t('Обновлён контакт пункта на улице Нажимеденова, 28.', 'Нәжімеденов көшесі, 28 мекенжайындағы пункттің байланысы жаңартылды.', 'The contact number for the service point at 28 Nazhimedenov Street has changed.'),
    facts: [{ label: t('Новый номер', 'Жаңа нөмір', 'New number'), value: t('+7 778 996 84 59', '+7 778 996 84 59', '+7 778 996 84 59') }],
    sections: [
      s(t('Сохраните контакт', 'Байланысты сақтаңыз', 'Save the contact'), t('В сообщении от 10 сентября указан номер +7 778 996 84 59 для этого пункта приёма и выдачи.', '10 қыркүйектегі хабарламада осы қабылдау және беру пункті үшін +7 778 996 84 59 нөмірі көрсетілген.', 'The 10 September notice lists +7 778 996 84 59 for this collection and drop-off point.')),
      s(t('Уточните перед поездкой', 'Барар алдында нақтылаңыз', 'Check before travelling'), t('По этому контакту можно уточнить вопросы по пункту на Нажимеденова, 28. Для других офисов используйте раздел контактов.', 'Осы нөмірден Нәжімеденов көшесі, 28 мекенжайындағы пункт туралы сұрауға болады. Басқа кеңселер үшін байланыс бөлімін пайдаланыңыз.', 'Use this number for enquiries about the point at 28 Nazhimedenov Street. For other offices, use the contacts section.'))
    ],
    related: [link('contacts.html', 'Все контакты', 'Барлық байланыстар', 'All contacts'), link('news.html', 'Все новости', 'Барлық жаңалықтар', 'All news')]
  }
];
