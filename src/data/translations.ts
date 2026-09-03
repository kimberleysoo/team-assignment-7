import { AppLanguage } from '../types';

export interface Translations {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  navSanctuary: string;
  navDiscover: string;
  navItinerary: string;
  navBookings: string;
  navSaved: string;
  navProfile: string;
  stepSanctuary: string;
  stepPractitioner: string;
  stepDateTime: string;
  stepReserve: string;

  // Discover screen
  locationSelectorLabel: string;
  locationAllSingapore: string;
  locationParagon: string;
  locationPalais: string;
  locationDempsey: string;
  locationMarinaBay: string;
  searchPlaceholder: string;
  categoryAll: string;
  categoryFacial: string;
  categorySculpt: string;
  categoryPeel: string;
  categoryLaser: string;
  categoryLymphatic: string;
  filterAll: string;
  filterFacial: string;
  filterLift: string;
  filterCellular: string;
  filterPeel: string;
  spotlightBadge: string;
  spotlightTitle: string;
  spotlightDesc: string;
  spotlightAction: string;
  bnplLearnMore: string;
  verifiedPractitioner: string;
  nextAvailable: string;
  startingFrom: string;
  bookSession: string;
  dailyJournalTitle: string;
  dailyJournalSubtitle: string;
  openJournal: string;
  featuredDirector: string;
  viewMasterProfile: string;
  exclusiveInstallmentTitle: string;
  exclusiveInstallmentDesc: string;
  learnMore: string;
  skinIntelligence: string;
  personalizedForYou: string;
  dispatchesCount: string;
  verifiedMaster: string;
  top1Percent: string;
  reviews: string;
  nextSlot: string;
  directRate: string;
  from: string;
  reserve: string;
  journalTitle: string;
  journalHeadline: string;
  journalExcerpt: string;
  readDispatch: string;

  // Practitioner Detail screen
  dossierTitle: string;
  boardCertified: string;
  topRated: string;
  experienceYears: string;
  ratingLabel: string;
  clientsLabel: string;
  verifiedLabel: string;
  editorialSynthesis: string;
  realtimeDispatches: string;
  repeatIntent: string;
  viewAllReviews: string;
  atelierProtocols: string;
  curatedTreatmentMenu: string;
  offeringsCount: string;
  includesDiagnostic: string;
  minutes: string;
  clinicalDocumentation: string;
  studioPortfolio: string;
  privateSanctuary: string;
  standardRate: string;
  orInstallmentsWithAtome: string;
  instantConfirmation: string;
  reserveService: string;

  // Date & Time screen
  scheduleTitle: string;
  selectAppointmentSlot: string;
  monthOctober: string;
  morning: string;
  afternoon: string;
  evening: string;
  bespokeAddons: string;
  clinicalIntake: string;
  sensitivitiesTitle: string;
  sensitiveSkin: string;
  pregnancySafe: string;
  targetPigmentation: string;
  addSpecialRequest: string;
  saveRequest: string;
  proceedToCheckout: string;
  proceedToPayment: string;
  calculatedDuration: string;

  // Confirmation & Payment screen
  reservationSecured: string;
  bookingConfirmation: string;
  pricingBreakdown: string;
  sanitizationFee: string;
  loyaltyReward: string;
  flexiblePayment: string;
  securingEscrow: string;
  itineraryConfirmed: string;
  encryptedNotice: string;
  venueSuite: string;
  scheduleLabel: string;
  paymentMode: string;
  downloadPass: string;
  returnHome: string;
  transparentPricing: string;
  noHiddenFees: string;
  subtotal: string;
  serviceFeeWaived: string;
  loyaltyDiscount: string;
  totalDue: string;
  currencyDisclaimer: string;
  flexiblePaymentOptions: string;
  payIn3: string;
  payIn3Desc: string;
  today: string;
  payInFull: string;
  instantPass: string;
  confirmReservation: string;

  // Bookings & Profile screens
  upcomingAppointments: string;
  confirmedBadge: string;
  discreetPass: string;
  viewPass: string;
  reviewItinerary: string;
  pastTreatments: string;
  completed: string;
  savedPractitioners: string;
  noSavedYet: string;
  exploreDirectory: string;
  vipMember: string;
  memberSince: string;
  noirPrivilege: string;
  pointsLabel: string;
  noirBenefits: string;
  skinProfile: string;
  primaryFocus: string;
  skinSensitivity: string;
  paymentMethods: string;
  languageAndRegion: string;
  languagePreference: string;
  currencySetting: string;
  medicalDiscretion: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    brandName: 'ÉLAN',
    brandTagline: 'Couture Aesthetic Medical Sanctuary',
    navSanctuary: 'Sanctuary',
    navDiscover: 'Sanctuary',
    navItinerary: 'Itinerary',
    navBookings: 'Itinerary',
    navSaved: 'Saved',
    navProfile: 'VIP Client',
    stepSanctuary: '01. Sanctuary',
    stepPractitioner: '02. Master Suite',
    stepDateTime: '03. Date & Time',
    stepReserve: '04. Reserve',

    locationSelectorLabel: 'Current Sanctuary',
    locationAllSingapore: 'All Singapore Ateliers',
    locationParagon: 'Paragon Medical, Orchard',
    locationPalais: 'Palais Renaissance, Orchard',
    locationDempsey: 'Dempsey Hill, Loewen Road',
    locationMarinaBay: 'Marina Bay Financial Hub',
    searchPlaceholder: 'Search estheticians, bespoke facials, cryo lift...',
    categoryAll: 'All Curations',
    categoryFacial: 'Bespoke Facials',
    categorySculpt: 'Microcurrent & Buccal',
    categoryPeel: 'Bio-Cellular Peels',
    categoryLaser: 'Photorejuvenation',
    categoryLymphatic: 'Lymphatic Drainage',
    filterAll: 'All Curations',
    filterFacial: 'Bespoke Facials',
    filterLift: 'Microcurrent & Buccal',
    filterCellular: 'Bio-Cellular Peels',
    filterPeel: 'Photorejuvenation',
    spotlightBadge: 'Sanctuary Master Director',
    spotlightTitle: 'Haute Couture Facial Architecture',
    spotlightDesc: 'A multi-layered cellular rejuvenation protocol integrating quad-wave ultrasound, bespoke botanical acids, and intra-oral buccal lifting.',
    spotlightAction: 'Inspect Atelier Dossier',
    bnplLearnMore: 'Explore 0% APR Details',
    verifiedPractitioner: 'Verified Master Practitioner',
    nextAvailable: 'Next Available Suite',
    startingFrom: 'from',
    bookSession: 'Reserve Session',
    dailyJournalTitle: 'Pre-treatment hydration protocols & bio-identical barrier care',
    dailyJournalSubtitle: 'To maximize ultrasound cavitation and deep dermal peeling results, pause retinol formulations 72 hours prior and reinforce lipid barrier integrity.',
    openJournal: 'Read Dermatologist Dispatch',
    featuredDirector: 'Featured Sanctuary Director',
    viewMasterProfile: 'Inspect Atelier Dossier',
    exclusiveInstallmentTitle: 'Effortless Indulgence',
    exclusiveInstallmentDesc: 'Split into 3 zero-interest installments with Atome & GrabPay',
    learnMore: 'Learn More',
    skinIntelligence: 'Skin Intelligence',
    personalizedForYou: 'Personalized For You',
    dispatchesCount: 'Verified Masters',
    verifiedMaster: 'Verified Master',
    top1Percent: 'Top 1%',
    reviews: 'reviews',
    nextSlot: 'Next',
    directRate: 'Direct Rate',
    from: 'from',
    reserve: 'Reserve',
    journalTitle: 'Daily Concierge Journal • Volume I',
    journalHeadline: 'Pre-treatment hydration protocols & bio-identical barrier care',
    journalExcerpt: 'To maximize ultrasound cavitation and deep dermal peeling results, pause retinol formulations 72 hours prior and reinforce lipid barrier integrity.',
    readDispatch: 'Read Dermatologist Dispatch',

    dossierTitle: 'Master Atelier Dossier',
    boardCertified: 'Board Certified',
    topRated: 'Top 1% Rated',
    experienceYears: '12+ Yrs Experience',
    ratingLabel: 'Rating',
    clientsLabel: 'Clients',
    verifiedLabel: 'Verified',
    editorialSynthesis: 'LLM Editorial Review Synthesis',
    realtimeDispatches: 'Realtime Dispatches',
    repeatIntent: '99.4% Client Repeat Intent',
    viewAllReviews: 'View All Reviews',
    atelierProtocols: 'Atelier Protocols',
    curatedTreatmentMenu: 'Curated Treatment Menu',
    offeringsCount: 'Offerings',
    includesDiagnostic: 'Includes Skin Diagnostic',
    minutes: 'min',
    clinicalDocumentation: 'Clinical Documentation',
    studioPortfolio: 'Studio Case Portfolio',
    privateSanctuary: 'Private Sanctuary',
    standardRate: 'Standard Rate',
    orInstallmentsWithAtome: 'Or 3x with Atome (0% APR)',
    instantConfirmation: 'Instant Pass',
    reserveService: 'Reserve',

    scheduleTitle: 'Reserve Sanctuary Slot',
    selectAppointmentSlot: 'Select Private Date & Time',
    monthOctober: 'October 2024',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    bespokeAddons: 'Bespoke Clinical Enhancements',
    clinicalIntake: 'Skin Sensitivity & Intake Notes',
    sensitivitiesTitle: 'Common Considerations',
    sensitiveSkin: 'Sensitive / Reactive Skin',
    pregnancySafe: 'Pregnancy-Safe Formulations Only',
    targetPigmentation: 'Targeting Melasma / Hyperpigmentation',
    addSpecialRequest: 'Add Private Concierge Request',
    saveRequest: 'Save Note',
    proceedToCheckout: 'Proceed to Confirmation',
    proceedToPayment: 'Continue to Payment & Confirmation',
    calculatedDuration: 'Total Duration',

    reservationSecured: 'Reservation Secured',
    bookingConfirmation: 'Sanctuary Booking Confirmation',
    pricingBreakdown: 'Transparent Pricing Breakdown',
    sanitizationFee: 'Sterile Suite Prep & Protocol',
    loyaltyReward: 'Noir Privilège Tier Reward',
    flexiblePayment: 'Select Settlement Method',
    securingEscrow: 'Securing Encrypted Sanctuary Escrow...',
    itineraryConfirmed: 'Sanctuary Itinerary Confirmed',
    encryptedNotice: '256-Bit Encrypted Concierge Escrow',
    venueSuite: 'Sanctuary Suite',
    scheduleLabel: 'Schedule',
    paymentMode: 'Payment Mode',
    downloadPass: 'Download Pass & Calendar File',
    returnHome: 'Return to Sanctuary Home',
    transparentPricing: 'Transparent Pricing Breakdown',
    noHiddenFees: 'No Hidden Fees',
    subtotal: 'Subtotal',
    serviceFeeWaived: 'Service & Sanitization Fee',
    loyaltyDiscount: 'Luxury Loyalty Points',
    totalDue: 'Total Due',
    currencyDisclaimer: 'SGD Direct Atelier Rate (Singapore)',
    flexiblePaymentOptions: 'Flexible Payment Options',
    payIn3: 'Pay in 3 Installments (0% APR)',
    payIn3Desc: 'Split effortlessly into 3 zero-interest payments with Atome or GrabPay.',
    today: 'Today',
    payInFull: 'Pay in Full with Card / Apple Pay',
    instantPass: 'Instant Confirmation',
    confirmReservation: 'Confirm & Authorize Reservation',

    upcomingAppointments: 'Upcoming Appointments',
    confirmedBadge: 'Confirmed Atelier Booking',
    discreetPass: 'Discreet Arrival Pass',
    viewPass: 'View Pass',
    reviewItinerary: 'Review Itinerary & Details',
    pastTreatments: 'Past Treatments',
    completed: 'Completed',
    savedPractitioners: 'Saved Practitioners',
    noSavedYet: 'No Saved Practitioners Yet',
    exploreDirectory: 'Explore Atelier Directory',
    vipMember: 'VIP Member',
    memberSince: 'Orchard Road Atelier Member since 2023',
    noirPrivilege: 'Noir Privilège Tier',
    pointsLabel: 'Points',
    noirBenefits: 'Exclusive access to priority weekend suite bookings, waived sanitization guarantees, and complimentary peptide add-ons.',
    skinProfile: 'Clinical Skin Profile',
    primaryFocus: 'Primary Focus',
    skinSensitivity: 'Skin Sensitivity',
    paymentMethods: 'Payment & Installments',
    languageAndRegion: 'Language & Region Preferences',
    languagePreference: 'Language / 语言',
    currencySetting: 'Region & Currency',
    medicalDiscretion: 'All appointment notes protected by Singapore Medical Discretion Protocol'
  },
  zh: {
    brandName: 'ÉLAN 艾澜',
    brandTagline: '新加坡高级医美定制私享中心',
    navSanctuary: '探索甄选',
    navDiscover: '探索甄选',
    navItinerary: '预约行程',
    navBookings: '预约行程',
    navSaved: '我的收藏',
    navProfile: '贵宾会员',
    stepSanctuary: '01. 甄选探索',
    stepPractitioner: '02. 专家档案',
    stepDateTime: '03. 预约时段',
    stepReserve: '04. 席位确认',

    locationSelectorLabel: '当前院区',
    locationAllSingapore: '新加坡全岛院区',
    locationParagon: '乌节路 百丽宫医疗中心',
    locationPalais: '乌节路 文艺复兴广场',
    locationDempsey: '登布西山 罗文路私享花园',
    locationMarinaBay: '滨海湾 金融中心',
    searchPlaceholder: '搜索顶级美疗师、定制面部护理、微电流提拉...',
    categoryAll: '全部项目',
    categoryFacial: '定制面部护理',
    categorySculpt: '微电流与口腔提拉',
    categoryPeel: '生物细胞焕肤',
    categoryLaser: '光子嫩肤修复',
    categoryLymphatic: '淋巴引流排毒',
    filterAll: '全部项目',
    filterFacial: '定制面部护理',
    filterLift: '微电流提拉',
    filterCellular: '细胞抗衰',
    filterPeel: '生物焕肤',
    spotlightBadge: '院区特邀总监',
    spotlightTitle: '高级定制面部雕塑架构',
    spotlightDesc: '融合四波段超声波、定制天然植物酸与口腔内筋膜提拉的高定细胞年轻化综合方案。',
    spotlightAction: '查阅专家全案档案',
    bnplLearnMore: '查看免息分期细则',
    verifiedPractitioner: '认证专家医师',
    nextAvailable: '最近可约套房',
    startingFrom: '起',
    bookSession: '立即预约',
    dailyJournalTitle: '术前深层水合修护与仿生屏障保养准则',
    dailyJournalSubtitle: '为最大化深层焕肤与超声波抗衰效果，建议在护理前72小时暂停维A酸产品，并使用仿生神经酰胺强化屏障。',
    openJournal: '阅读皮肤科医师手记',
    featuredDirector: '本周特邀院区总监',
    viewMasterProfile: '查阅专家全案档案',
    exclusiveInstallmentTitle: '尊享免息礼遇',
    exclusiveInstallmentDesc: '通过 Atome 或 GrabPay 享受 3期 0% 零利率免息分期',
    learnMore: '了解详情',
    skinIntelligence: '美肤智库',
    personalizedForYou: '专属定制方案',
    dispatchesCount: '位认证专家',
    verifiedMaster: '认证专家',
    top1Percent: '前1%甄选',
    reviews: '条真实评价',
    nextSlot: '最近可约',
    directRate: '尊享价',
    from: '起',
    reserve: '立即预约',
    journalTitle: '每日皮肤专刊 • 卷一',
    journalHeadline: '术前深层水合修护与仿生屏障保养准则',
    journalExcerpt: '为最大化深层焕肤与超声波抗衰效果，建议在护理前72小时暂停维A酸产品，并使用仿生神经酰胺强化屏障。',
    readDispatch: '阅读皮肤科医师手记',

    dossierTitle: '专家档案详录',
    boardCertified: '执业认证医师',
    topRated: '前1%最高评分',
    experienceYears: '12年以上资深经验',
    ratingLabel: '评分',
    clientsLabel: '尊贵客户',
    verifiedLabel: '真实认证',
    editorialSynthesis: 'AI 综合疗效与口碑分析',
    realtimeDispatches: '实时反馈报告',
    repeatIntent: '99.4% 客户再次复约意愿',
    viewAllReviews: '查看全部真实评价',
    atelierProtocols: '经典理疗方案',
    curatedTreatmentMenu: '精选理疗项目菜单',
    offeringsCount: '个项目',
    includesDiagnostic: '包含专业皮肤检测',
    minutes: '分钟',
    clinicalDocumentation: '临床前后对比案例',
    studioPortfolio: '私享案例展示',
    privateSanctuary: '私密独立诊室',
    standardRate: '标准项目价格',
    orInstallmentsWithAtome: '或 Atome 3期免息分期 (0% APR)',
    instantConfirmation: '极速出票',
    reserveService: '预约该项目',

    scheduleTitle: '预订私密护理时段',
    selectAppointmentSlot: '选择专属日期与时间',
    monthOctober: '2024年 10月',
    morning: '上午时段',
    afternoon: '下午时段',
    evening: '傍晚时段',
    bespokeAddons: '定制附加护理项目',
    clinicalIntake: '皮肤敏感度与特殊需求说明',
    sensitivitiesTitle: '常见肤质说明',
    sensitiveSkin: '敏感 / 屏障脆弱肌肤',
    pregnancySafe: '仅限孕期安全成分配方',
    targetPigmentation: '针对色斑 / 黄褐斑淡化',
    addSpecialRequest: '添加私享礼宾需求备注',
    saveRequest: '保存备注',
    proceedToCheckout: '进入结算确认',
    proceedToPayment: '前往支付与确认席位',
    calculatedDuration: '总疗程时间',

    reservationSecured: '席位已锁定',
    bookingConfirmation: '预约订单确认',
    pricingBreakdown: '透明费用明细',
    sanitizationFee: '医用级独立套房准备与消毒',
    loyaltyReward: 'Noir Privilège 黑卡会员礼遇抵扣',
    flexiblePayment: '选择结算支付方案',
    securingEscrow: '正在通过 256 位银行级安全通道锁定席位...',
    itineraryConfirmed: '预约行程确认成功',
    encryptedNotice: '256位加密礼宾专管资金保障',
    venueSuite: '就诊套房',
    scheduleLabel: '预约时间',
    paymentMode: '支付方式',
    downloadPass: '下载通行凭证及日历',
    returnHome: '返回主页',
    transparentPricing: '透明费用明细',
    noHiddenFees: '零隐藏费用',
    subtotal: '项目小计',
    serviceFeeWaived: '服务及消毒保障费',
    loyaltyDiscount: '黑卡会员积分抵扣',
    totalDue: '实付总额',
    currencyDisclaimer: '新加坡元 (SGD S$) 院区直付价格',
    flexiblePaymentOptions: '灵活付款方案',
    payIn3: '分 3 期免息付款 (0% APR)',
    payIn3Desc: '使用 Atome 或 GrabPay 轻松分成 3 期免息分期，无手续费。',
    today: '今日首期',
    payInFull: '信用卡 / Apple Pay 全额支付',
    instantPass: '即时确认',
    confirmReservation: '确认并支付预约金',

    upcomingAppointments: '已预约行程',
    confirmedBadge: '院区已确认席位',
    discreetPass: '尊贵私密入场通行凭证',
    viewPass: '查看通行码',
    reviewItinerary: '查阅行程详情与导航',
    pastTreatments: '历史护理记录',
    completed: '已完成',
    savedPractitioners: '我的收藏专家',
    noSavedYet: '暂无收藏的专家',
    exploreDirectory: '浏览甄选专家名录',
    vipMember: '黑卡 VIP 会员',
    memberSince: '乌节路院区会员 · 始于2023年',
    noirPrivilege: '黑卡特权级别 (Noir Privilège)',
    pointsLabel: '积分',
    noirBenefits: '享专属周末时段优先锁定、免收卫生安全保障费、赠送高活性多肽导入疗程。',
    skinProfile: '个人临床肤质档案',
    primaryFocus: '核心诉求',
    skinSensitivity: '皮肤敏感度',
    paymentMethods: '支付方式与分期账户',
    languageAndRegion: '语言与地区偏好',
    languagePreference: '语言选择 / Language',
    currencySetting: '所在地区及货币',
    medicalDiscretion: '所有就诊记录与个人隐私均严格遵守新加坡医疗保密准则'
  }
};
