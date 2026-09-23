const introScene = document.querySelector('#introScene');
const hubScene = document.querySelector('#hubScene');
const worksScene = document.querySelector('#worksScene');
const pbrScene = document.querySelector('#pbrScene');
const projectScene = document.querySelector('#projectScene');
const ideasScene = document.querySelector('#ideasScene');
const processScene = document.querySelector('#processScene');
const aboutScene = document.querySelector('#aboutScene');
const aboutScroll = document.querySelector('#aboutScroll');
const aboutLightbox = document.querySelector('#aboutLightbox');
const aboutLightboxImage = document.querySelector('#aboutLightboxImage');
const aboutLightboxCaption = document.querySelector('#aboutLightboxCaption');
const aboutLightboxClose = document.querySelector('#aboutLightboxClose');
const introCover = document.querySelector('#introCover');
const introVideo = document.querySelector('#introVideo');
const enterButton = document.querySelector('#enterButton');
const portalFlash = document.querySelector('#portalFlash');
const contentPanel = document.querySelector('#contentPanel');
const panelBody = document.querySelector('#panelBody');
const panelClose = document.querySelector('#panelClose');
const projectVideo = document.querySelector('#projectVideo');
const videoMissing = document.querySelector('#videoMissing');
const videoMissingTitle = document.querySelector('#videoMissingTitle');
const videoMissingDetail = document.querySelector('#videoMissingDetail');
const projectFrame = document.querySelector('#projectFrame');
const projectHonors = document.querySelector('#projectHonors');
const projectNameLabel = document.querySelector('#projectName');
const projectCreated = document.querySelector('#projectCreated');
const projectModels = document.querySelector('#projectModels');
const projectProgress = document.querySelector('#projectProgress');
const projectProgressRange = document.querySelector('#projectProgressRange');
const descriptionText = document.querySelector('#descriptionText');
const descriptionPageIndex = document.querySelector('#descriptionPageIndex');
const descriptionPrev = document.querySelector('#descriptionPrev');
const descriptionNext = document.querySelector('#descriptionNext');
const ideasOpen = document.querySelector('#ideasOpen');
const ideasBack = document.querySelector('#ideasBack');
const ideasTopNext = document.querySelector('#ideasTopNext');
const ideasNextProject = document.querySelector('#ideasNextProject');
const ideasHeadingTitle = document.querySelector('#ideasHeadingTitle');
const ideasBackground = document.querySelector('#ideasBackground');
const ideasGalleries = [...document.querySelectorAll('[data-ideas-project]')];
const ideasCopy = document.querySelector('#ideasCopy');
const ideasPageIndex = document.querySelector('#ideasPageIndex');
const ideasCopyTitle = document.querySelector('#ideasCopyTitle');
const ideasCopyText = document.querySelector('#ideasCopyText');
const yueshiProcessSheet = document.querySelector('#yueshiProcessSheet');
const otherProcessSheet = document.querySelector('#otherProcessSheet');
const otherProcessContent = document.querySelector('#otherProcessContent');
const yueshiSoftwareCards = [...document.querySelectorAll('.ideas-software-card')];
if ('IntersectionObserver' in window) {
  const softwareObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-awaiting');
      entry.target.classList.add('is-visible');
      softwareObserver.unobserve(entry.target);
    });
  }, {root: yueshiProcessSheet, threshold: 0.2});
  yueshiSoftwareCards.forEach((card) => {
    card.classList.add('is-awaiting');
    softwareObserver.observe(card);
  });
}
const ideasPrev = document.querySelector('#ideasPrev');
const ideasNext = document.querySelector('#ideasNext');
const processContent = document.querySelector('#processContent');
const processScroll = document.querySelector('#processScroll');
const processScrollCue = document.querySelector('#processScrollCue');
const processTabs = [...document.querySelectorAll('[data-process-target]')];
const processPrev = document.querySelector('#processPrev');
const processNext = document.querySelector('#processNext');
const processPageIndex = document.querySelector('#processPageIndex');
const processProgressBar = document.querySelector('#processProgressBar');
const processLightbox = document.querySelector('#processLightbox');
const processLightboxImage = document.querySelector('#processLightboxImage');
const processLightboxCaption = document.querySelector('#processLightboxCaption');
const processLightboxClose = document.querySelector('#processLightboxClose');
const pbrScroll = document.querySelector('#pbrScroll');
const pbrScrollCue = document.querySelector('#pbrScrollCue');
const ideasScrollCue = document.querySelector('#ideasScrollCue');
const pbrContent = document.querySelector('#pbrContent');
const pbrNav = document.querySelector('#pbrNav');
const pbrLightbox = document.querySelector('#pbrLightbox');
const pbrLightboxImage = document.querySelector('#pbrLightboxImage');
const pbrLightboxCaption = document.querySelector('#pbrLightboxCaption');
const pbrLightboxClose = document.querySelector('#pbrLightboxClose');

const windTransitionSound = new Audio('./assets/wind-transition.mp3');
const bookFlipSound = new Audio('./assets/book-flip.mp3');
const cardDealSound = new Audio('./assets/card-deal.mp3');
const backgroundMusic = new Audio('./assets/portfolio-bgm.mp3');
const audioUnlockHint = document.querySelector('#audioUnlockHint');

[windTransitionSound, bookFlipSound, cardDealSound, backgroundMusic].forEach((sound) => {
  sound.preload = 'auto';
});

windTransitionSound.volume = .48;
bookFlipSound.volume = .72;
cardDealSound.volume = .58;
backgroundMusic.loop = true;
backgroundMusic.autoplay = true;

const backgroundMusicVolume = .32;
backgroundMusic.volume = backgroundMusicVolume;
let backgroundFadeFrame = 0;
let backgroundFadeToken = 0;

function playFromStart(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function playLayered(sound) {
  const layer = sound.cloneNode();
  layer.volume = sound.volume;
  layer.play().catch(() => {});
}

function fadeBackgroundMusic(targetVolume, duration = 700) {
  const token = ++backgroundFadeToken;
  window.cancelAnimationFrame(backgroundFadeFrame);
  const startVolume = backgroundMusic.volume;
  const startedAt = performance.now();

  if (targetVolume > 0 && backgroundMusic.paused) {
    backgroundMusic.volume = Math.min(startVolume, targetVolume);
    backgroundMusic.play().catch(() => {});
  }

  const tick = (now) => {
    if (token !== backgroundFadeToken) return;
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 2);
    backgroundMusic.volume = startVolume + (targetVolume - startVolume) * eased;

    if (progress < 1) {
      backgroundFadeFrame = window.requestAnimationFrame(tick);
      return;
    }

    backgroundMusic.volume = targetVolume;
  };

  backgroundFadeFrame = window.requestAnimationFrame(tick);
}

function resumeBackgroundMusic(duration = 700) {
  fadeBackgroundMusic(backgroundMusicVolume, duration);
}

function silenceBackgroundMusic(duration = 680) {
  fadeBackgroundMusic(0, duration);
}

function unlockBackgroundMusicOnFirstInteraction(event) {
  if (projectScene.classList.contains('is-active') || !backgroundMusic.paused) return;
  backgroundMusic.play().then(() => {
    audioUnlockHint.hidden = true;
    document.removeEventListener('pointerdown', unlockBackgroundMusicOnFirstInteraction, true);
    document.removeEventListener('touchstart', unlockBackgroundMusicOnFirstInteraction, true);
    document.removeEventListener('keydown', unlockBackgroundMusicOnFirstInteraction, true);
  }).catch(() => {});
}

document.addEventListener('pointerdown', unlockBackgroundMusicOnFirstInteraction, true);
document.addEventListener('touchstart', unlockBackgroundMusicOnFirstInteraction, true);
document.addEventListener('keydown', unlockBackgroundMusicOnFirstInteraction, true);

// 首屏直接以正常音量尝试有声自动播放，浏览器拒绝时显示解锁提示。
function tryStartBackgroundMusic() {
  if (projectScene.classList.contains('is-active') || !backgroundMusic.paused) return;
  backgroundMusic.play().then(() => { audioUnlockHint.hidden = true; }).catch(() => {
    if (introScene.classList.contains('is-active')) audioUnlockHint.hidden = false;
  });
}
tryStartBackgroundMusic();
window.addEventListener('pageshow', tryStartBackgroundMusic);

const doorLayers = {
  right: document.querySelector('#doorRightLayer'),
  center: document.querySelector('#doorCenterLayer'),
  left: document.querySelector('#doorLeftLayer'),
};

const projectContent = {
  yueshi: {
    title: '粤食往生',
    created: '2026年4月19日',
    models: '即梦 Seedance 2.0',
    kicker: '实验影像 × 岭南饮食 × 荒诞叙事',
    lead: '以岭南饮食文化为视觉入口，通过轮回、吞食与转化的意象建立带有荒诞感的意识流叙事。重点展示原创命题、视听节奏与连续分镜设计。',
    tags: ['概念创作', '导演设计', '文字与画面分镜', 'AIGC影像', '后期剪辑'],
  },
  kurong: {
    title: '枯荣之歌',
    kicker: '音乐主导影像 × 角色表演',
    lead: '从音乐结构出发建立“消亡—转化—新生”的情绪线。以精灵旋转升空、群体调度、色彩变化和剪辑密度回应乐段的起伏。',
    tags: ['音乐分析', '概念剧本', '角色表演', '群体调度', '节奏剪辑'],
  },
  memory: {
    title: '记忆褶皱',
    kicker: '记忆空间 × 风格化影像',
    lead: '通过空间折叠、视觉重复与质感变化表现记忆的不稳定状态，并在多模型协作中保持人物、场景与整体风格的一致性。',
    tags: ['视觉概念', '分镜设计', '风格统一', '可灵1.6', '即梦3.0', 'Midjourney 6.0'],
  },
  night: {
    title: '夜行无声',
    kicker: '动作分镜 × 角色PV',
    lead: '利用景别变化、方向性动作、装备展示与情绪递进塑造角色。通过机位、轴线和剪辑节奏保证高速动作中的空间关系清晰。',
    tags: ['动作设计', '镜头调度', '轴线控制', '角色塑造', 'PV成片'],
  },
  redmoon: {
    title: '赤月审判',
    kicker: '角色塑造 × 情绪递进',
    lead: '围绕角色力量感与危险气质建立镜头节奏，以构图压迫、动作爆发和红色视觉母题完成角色形象的集中表达。',
    tags: ['角色PV', '动作分镜', '视觉节奏', '氛围设计', '成片输出'],
  },
};

const processMaterials = {
  kurong: {
    storyboard: 'storyboard-kurong.webp',
    frames: Array.from({length: 11}, (_, i) => `keyframe-kurong-${String(i + 1).padStart(2, '0')}.webp`),
    process: ['process-kurong-map-v2.webp'],
  },
  memory: {
    storyboard: 'storyboard-memory.webp',
    frames: [],
    process: ['process-memory-generation.webp', 'process-memory-map.webp', 'process-memory-motion.webp'],
  },
  night: {
    storyboard: 'storyboard-night.webp',
    frames: Array.from({length: 4}, (_, i) => `keyframe-night-${String(i + 1).padStart(2, '0')}.webp`),
    process: [],
  },
  redmoon: {
    storyboard: 'storyboard-redmoon.webp',
    frames: Array.from({length: 4}, (_, i) => `keyframe-redmoon-${String(i + 1).padStart(2, '0')}.webp`),
    process: [],
  },
};

const nextPortfolioWork = {kurong: 'redmoon', redmoon: 'yueshi', yueshi: 'night', night: 'memory'};

const projectData = {
  yueshi: {
    title: '粤食往生',
    created: '2026年4月19日',
    models: '即梦seedance2.0模型',
    frame: './assets/yueshi-frame.png',
    frameAlt: '粤食往生油画质感作品播放框架',
    video: './assets/yueshi.mp4',
    origin: '50% 52%',
    pages: [
      '《粤食往生》是一部融合实验影像与岭南饮食文化的艺术短片，以粤菜食材为核心载体，构建超现实生命轮回叙事。整体基调兼具紧张刺激、未知探险与荒诞幽默，依托极致镜头语言打造强节奏视觉体验。',
      '作品以食材生命形态流转为叙事线索，打破常规美食影像逻辑，解构饮食与生命的边界。从三文鱼水域游动、跃出水面转场为食材，经烹饪成为菜品，再到刺身挣脱、异变轮回为鹅，继而转化为烧鹅，衔接水下生蚝与爆炒场景，最终形成时空闭环，完成食材从自然到餐桌、再回归自然的往生之旅，暗含对生命意志与万物联结的表达。',
      '视觉呈现遵循冷暖色调交替、虚实场景切换的原则。采用水下推进、磁吸式主体追踪、超广角鱼眼透视、上帝视角几何构图等运镜方式，搭配瞬间转场、高速推拉、慢动作横摇、盗梦空间式轴向旋转等剪辑手法，并融入漫画速度线、失重震动等视觉效果，强化节奏张力与荒诞氛围。',
      '全片以快慢镜头交替、动静画面对比构建层层递进的叙事节奏。作品依托地域饮食文化基底，突破传统美食短片创作范式，将实验影像手法与人文思考结合，以具象化影像传递对生命形态与饮食伦理的探索，实现艺术表达与文化内核的统一。',
    ],
  },
  kurong: {
    title: '枯荣之歌',
    honors: '入选「艺象新生——国家大剧院数字艺术展」，作品现于北京国家大剧院公开展览。获得2025年在校生优秀作业二等奖。',
    created: '2025年9月29日',
    models: '即梦3.5、可灵2.1',
    frame: './assets/project-kurong-frame.png',
    frameAlt: '枯荣之歌彩色绘画作品播放框架',
    video: './assets/kurong.mp4',
    origin: '7% 48%',
    pages: [
      '《枯荣之歌》是以“消亡—转化—新生”为核心轮回观的音乐动画，旨在以拉丁美洲式的热烈生命力，赞颂生命的激情与欢乐。',
      '视觉上，将采用高饱和度的黄绿、红蓝与暖橙色调，结合表现主义与超现实主义的自由笔触，营造色彩浓烈、笔触写意的炽热氛围。线条与色块在运动中兼具装饰性与情绪张力，画面轻盈而充满律动。',
      '故事中，枯木化作的透明精灵，将在穿梭与集体舞蹈中，引爆一场色彩的狂欢。最终，我们将借精灵雀跃的舞步与蓬勃的热情，让每一帧画面都跃动着异域的狂欢灵魂与文化脉搏，完成一场跨越世界的生命礼赞。',
    ],
  },
  memory: {
    title: '记忆褶皱',
    honors: '入选「纪元2046·超媒介艺术海选暨2025中法环境月艺术大赛」17–22岁组VIP媒体特展，于北京语言大学中法人文交流空间展出。获得天工协作奖。',
    created: '2025年5月5日',
    models: '可灵1.6、即梦3.0',
    frame: './assets/project-memory-frame.png',
    frameAlt: '记忆褶皱青红色作品播放框架',
    video: './assets/memory.mp4',
    origin: '93% 48%',
    pages: [
      '《记忆褶皱》是一部以抽象视觉语言表现“记忆的失真与重组”的实验性艺术短片，借三段式人生叙事——降生、受控、蜕变——讲述一个生命从懵懂入世、被无形力量掌控，到觉醒并亲手斩断枷锁、破茧重生的精神历程。',
      '题材定位：记忆主题的抽象艺术影像（实验／诗性叙事短片），核心不在情节，而在情绪与隐喻。',
      '叙事结构：三幕递进——“降生”（啼哭坠入世界）→“受控”（童年幻想被现实击碎、窒息感中生出挣脱念头）→“蜕变”（识破提线木偶般的操控、斩断枷锁、破茧重生）。',
      '视觉风格以褪色红、蓝为主色调，搭配局部高饱和色块，营造记忆褪色又局部鲜明的矛盾感。动态采用旧胶片式“撕扯”质感，以卡顿与加速交替，叠加故障艺术的像素扭曲，对应记忆的失真、断裂与重组。',
    ],
  },
  night: {
    title: '夜行无声',
    created: '2026年6月3日',
    models: '即梦 Seedance 2.0',
    frame: './assets/project-night-frame.png',
    frameAlt: '夜行无声暗色洞穴作品播放框架',
    video: './assets/night.mp4',
    origin: '72% 52%',
    pages: [
      '《夜行无声》是一部以“追踪—潜入—压制—清剿”为行动链，控制景别、角色走位、轴线和运镜的角色个人展示短片。枪械镜头受限时，通过遮挡、弱化与景别替换维持叙事。',
    ],
  },
  redmoon: {
    title: '赤月审判',
    created: '2026年6月22日',
    models: '即梦 Seedance 2.0',
    frame: './assets/project-redmoon-frame.png',
    frameAlt: '赤月审判红黑色作品播放框架',
    video: './assets/redmoon.mp4',
    origin: '29% 52%',
    pages: [
      '《赤月审判》是一部以红月雨夜中的异常生命追踪为核心，将哥特猎魔意象与近未来侦察技术融合，通过“发现痕迹—锁定目标—药剂显形—完成审判”的叙事递进，塑造冷静、克制而危险的暗夜猎人形象。',
    ],
  },
};

let introStarted = false;
let panelReturnFocus = null;
let descriptionPage = 0;
let glitchTimer = null;
let activeProject = 'yueshi';
let descriptionPages = projectData.yueshi.pages;
let ideasPage = 0;
let ideasSheet = 0;
let activeIdeasGallery = document.querySelector('#ideasGalleryYueshi');
const dealtIdeasProjects = new Set();

const ideasProjectData = {
  yueshi: {
    label: '粤食往生制作思路',
    background: './assets/yueshi-ideas-bg.webp',
    pages: [
      {
        title: '灵感来源与风格参考',
        html: '<h3>灵感来源</h3><p>本片的创作灵感，源自广州、深圳、珠海三城游历时的所见所感。穿行于岭南街巷，流连于餐桌之间，一路风景与美食带来的鲜活体验，构成了这部作品的底色。</p>',
      },
      {
        title: '创作初衷',
        html: '<p>打破传统美食宣传片平铺直叙的展示方式，用新颖趣味的视觉创意，生动直观地介绍经典广式菜肴——让观众在轻松愉悦中，感受粤菜精致讲究、品类丰富、色香味俱全的饮食魅力，传播岭南特色饮食文化。</p>',
      },
      {
        title: '风格参考及原因',
        html: '<p>视觉风格参考英国画家奥利・勒布罗克（Ollie Le Brocq）的油画。</p><p><strong>风格特征：</strong>大块面的色彩构成、简洁的造型语言、柔和的色调，画面兼具图形化的清晰与松弛的轻松感。</p><p><strong>选择原因：</strong>全片氛围定位为“轻松愉悦”，借助他的大块色绘画手法，让每一帧都明快舒展，与粤菜温暖鲜活的质感形成呼应。</p>',
      },
    ],
  },
  kurong: {
    label: '枯荣之歌制作思路',
    background: './assets/kurong-ideas-bg.webp',
    pages: [
      {
        title: '音乐感受与风格参考',
        html: '<p>这首曲子给我的核心感受，可以概括为四个关键词：<strong>激情、欢乐、热情洋溢的生命力，以及“邀请与共同分享”</strong>。它不是“吹风的绵延轻柔”，而是一种充满力量的狂欢式律动。</p>',
      },
      {
        title: '狂欢式律动',
        html: '<p>像一群人聚集在墨西哥广场上跳着踢踏舞，脚步铿锵，却活力四射。旋律的“起伏”是热情的跳跃与迸发：像节日烟花在夜空中绚烂地爬升、炸开，声音饱满且极具穿透力。</p><p>每一个音符都带着“快来加入狂欢”的邀请，直接、炽热，圆润却绝不轻柔——是那种能让人瞬间想跳进舞池的热闹与激情。因此，画面设计围绕“狂欢”展开，让视觉律动与音乐的情绪同频共振。</p>',
      },
      {
        title: '文本创意',
        html: '<p>太阳升起，阳光唤醒沉睡的大地。枯死的植物化作白色透明的精灵，它们聚集在一起，化作一道光的漩涡，穿梭进入精灵的世界。精灵世界的居民们热情地迎接新精灵的到来。</p><p>白色透明的精灵们最终抵达一潭与世界相通的神奇水潭——它们用舞蹈唤醒水潭，水潭发出金黄色的光，为精灵们染上色彩；圣光穿透世界，枯死的树木重焕生机。太阳升起，植物发芽开花，生命进入了新的轮回。</p>',
      },
      {
        title: '舞蹈与文化表达',
        html: '<p>舞蹈设计参考墨西哥民间舞蹈<strong>哈拉贝・塔帕蒂奥舞</strong>（Jarabe Tapatío，即“墨西哥帽舞”）。借精灵满溢的激情、雀跃的欢乐与热情蓬勃的生命力，演绎拉丁美洲人民的热情——让每一个舞步都跃动着异域的狂欢灵魂与文化脉搏，以“枯荣更替”的东方意象，承载“热情共享”的拉美精神。</p>',
      },
      {
        title: '思路逻辑链',
        html: '<p><strong>音乐感受（激情・欢乐・生命力・邀请共享）→ 狂欢式动感＋烟花式旋律起伏 → 画面节奏随音乐设计 → 精灵枯荣的奇幻叙事 → 哈拉贝・塔帕蒂奥舞步 → 演绎拉美热情与文化脉搏。</strong></p>',
      },
      {
        title: '风格参考及原因',
        html: '<p>在视觉风格上，本片参考画家马克・夏加尔（Marc Chagall）的绘画。</p><p>夏加尔的画作给我最直接的感受来自他的<strong>色彩</strong>——饱满而富有情绪张力，不需要任何解释，情绪就扑面而来；同时他的<strong>画面表现灵活自由</strong>，形体可以漂浮、错位、重叠，一切为情感与想象服务，不受现实规则束缚。</p><p>选择他的原因，是本片希望用色彩直接说话，让画面自由承载情绪。以夏加尔式的强烈色彩与灵动构图，把作品的情感浓度和想象力落到实处，让每一帧都像一首可以被看见的诗。</p>',
      },
    ],
  },
  memory: {
    label: '记忆褶皱制作思路',
    background: './assets/memory-ideas-bg.webp',
    pages: [
      {
        title: '记忆的失真与重组',
        html: '<p>《记忆褶皱》的核心概念，是用抽象视觉表现<strong>记忆的失真与重组</strong>——记忆在时间中褪色、断裂、错位，又被重新拼合，这种状态正是全片的视觉母题。</p>',
      },
      {
        title: '画风参考与视觉特征',
        html: '<p>在画风上，本片参考日本插画师スシザワ（Sushizawa）的插画风格。参考作品呈现鲜明的东方民俗与宗教神秘气质：<strong>红黑为主、局部青蓝的强对比配色，多眼多臂的异形形象，眼状纹饰、太阳与法阵式的图腾符号，对称而怪诞的构图，以及粗犷有力的线条</strong>——视觉上充满浓烈、诡谲、不加修饰的情绪张力。</p>',
      },
      {
        title: '风格选择原因',
        html: '<p>这一画风与《记忆褶皱》的核心表达高度契合：<strong>褪色的红蓝主色调对应记忆的黯淡与斑驳，局部高饱和色块与强对比呼应记忆中被放大的情绪片段；扭曲变形的人物与图腾，则直接呈现记忆在褶皱、错位、重组时的失真状态</strong>。</p><p>借鉴这种“用扭曲与浓烈表达情绪”的视觉语言，可以让抽象的“记忆失真”概念获得具象、有力的画面支撑。</p>',
      },
    ],
  },
  night: {
    label: '夜行无声制作思路',
    background: './assets/night-ideas-bg-v2.webp',
    pages: [
      {
        title: '创作灵感',
        html: '<p><strong>题材灵感：暗黑哥特与吸血鬼猎人。</strong></p><p>从血族猎杀题材的冷峻与神秘出发，提取黑色皮革、高领遮面、暗紫布料、旧化金属等元素，并借鉴《黑夜传说》中银弹与紫外线猎杀弹药的视觉概念，让子弹不只是武器，而是专门针对夜行异变目标的特殊猎杀装备。</p>',
      },
      {
        title: '风格灵感',
        html: '<p><strong>战术写实风游戏。</strong></p><p>设计围绕战术装备设定与技能逻辑展开，包括旋刃飞行器与静默潜袭，并重点拆解第一人称射击游戏皮肤宣传片的制作与展示方式，确立低调、冷峻、具备夜战识别度的皮肤语言。</p>',
      },
      {
        title: '叙事灵感',
        html: '<p><strong>黑夜、猎杀、处刑。</strong></p><p>以无名角色夜间追猎出逃的吸血鬼异变体为主线，通过追踪、隐蔽、压制、清剿构建完整行动逻辑。敌人刻意弱实体化，以半实体黑雾和红眼呈现，使叙事始终聚焦主角。</p>',
      },
      {
        title: '核心概括',
        html: '<p>用吸血鬼猎人的外壳，包裹现代战术干员的实战结构。</p><p>让哥特气质拥有现实依据，让战术装备带有血族猎杀的仪式感。</p>',
      },
      {
        title: '风格参考',
        html: '<p><strong>战术写实风游戏。</strong></p><p>参考同品类作品的装备组织、材质表现、动作逻辑与夜战氛围，重点是提取可服务本作叙事的视觉语言，而非照搬角色外形。</p>',
      },
      {
        title: '视觉特征与配色',
        html: '<p>提取模块化战术背带、护臂、弹药挂载、多功能腰包、重型战术靴、夜视仪等真实装备逻辑，并使用低反光暗色材质与写实光影。</p><p><strong>配色比例：</strong>炭黑80%，暗紫10%，蓝紫弹药5%，旧化金属5%。</p>',
      },
    ],
  },
  redmoon: {
    label: '赤月审判制作思路',
    background: './assets/redmoon-ideas-bg-v2.webp',
    pages: [
      {
        title: '创作灵感｜题材溯源',
        html: '<p><strong>《黑夜传说》提供血族特战基底：</strong>全哑光油蜡黑皮衣、分段皮绑带、高立领收腰剪裁、长款撕裂下摆披风，把古典夜行贵族礼服改造成城市隐秘作战服。</p>',
      },
      {
        title: '猎人机能与古典哥特',
        html: '<p><strong>《血源诅咒》提供猎人机能结构：</strong>破旧毛边做旧面料、模块化皮质护甲、弹药随身挂载、不对称剪裁、复古雕花金属扣件与单眼战术目镜，还原长期猎杀魔物的破败史诗感。</p><p><strong>《恶魔城》提供古典夜行哥特元素：</strong>收腰束身版型、燕尾下摆、十字架雕花配饰、暗纹丝绒内衬与黑红撞色，注入吸血鬼贵族的优雅与驱魔战士的凌厉。</p>',
      },
      {
        title: '角色结构公式',
        html: '<p>三者融合为一条结构公式：<strong>古典哥特外轮廓＋现代特战内构</strong>——外层长款撕裂披风／中层收腰束身战术马甲／内层紧身打底与分段皮质护臂／下身束脚皮裤与高帮多扣皮靴。</p>',
      },
      {
        title: '叙事灵感',
        html: '<p>以雨夜都市为世界观基底，围绕“追踪异常生命体”展开。生物信息追踪器负责夜视扫描、热成像、感染识别与HUD投影；释放红色药剂的旋刃飞行器使异化体显露特征并短暂静置；静音武器完成突击。</p><p>由此构成<strong>“侦察 → 识别 → 静置 → 猎杀”</strong>的完整行动逻辑；异常生命体设置伪装与原始双形态，制造悬念与反转。</p>',
      },
      {
        title: '配色逻辑',
        html: '<p><strong>炭黑／哑光墨黑85%</strong>：压迫与隐匿；<strong>暗酒红／铁锈棕12%</strong>：血族与嗜血暗示；<strong>做旧古铜／哑银3%</strong>：复古装备真实感。</p><p>全片规避高饱和亮色，统一低反光暗黑视觉。</p>',
      },
      {
        title: '风格参考｜《蝙蝠侠：阿卡姆骑士》',
        html: '<p><strong>参考对象：</strong>《蝙蝠侠：阿卡姆骑士》（Batman: Arkham Knight，2015）。</p><p><strong>雨夜都市氛围：</strong>阴郁色调与压抑氛围中，哥特式建筑与霓虹交织，与《赤月审判》的雨夜猎杀世界观同源。</p><p><strong>模块化战术战衣：</strong>层叠护甲和黑灰配色令角色融入阴影，红眼目镜对应侦察视觉，与本作“红色目镜＋夜视／热成像侦察”的设定直接呼应。</p>',
      },
      {
        title: 'Predator潜行猎杀',
        html: '<p>在阴影中游走、无声击倒、以恐惧压制敌人的潜行猎杀方式，对应本作<strong>“静音突击，而非重火力压制”</strong>的定位，以及低伏前倾的猎人姿态。</p>',
      },
    ],
  },
};

const legacyProcessPages = [
  {
    slug: 'overview',
    label: '能力总览',
    html: `
      <section class="process-page process-page--overview" aria-labelledby="process-overview-title">
        <div class="process-intro process-reveal">
          <div>
            <p class="process-kicker">FROM IDEA TO FINAL CUT</p>
            <h2 id="process-overview-title">从创作命题到成片交付</h2>
          </div>
          <p>我先决定作品要表达什么、观众在何时获得信息与情绪，再用剧本、分镜、表演、声音和剪辑把判断落实为镜头。AIGC承担试错与生产，最终选择始终服从叙事。</p>
        </div>

        <div class="process-phase-grid">
          <article class="process-phase process-reveal" style="--reveal: 70ms">
            <span class="process-phase-number">01</span>
            <p class="process-phase-en">PRE-PRODUCTION</p>
            <h3>前期 · 企划与设计</h3>
            <ul>
              <li>提炼一句话命题与核心冲突</li>
              <li>建立世界观、角色动机与叙事规则</li>
              <li>将音乐与情绪变化转化为剧情节拍</li>
              <li>拆解场景、道具、色彩与声音母题</li>
              <li>用文字分镜验证信息顺序与观看重点</li>
            </ul>
          </article>
          <article class="process-phase process-phase--accent process-reveal" style="--reveal: 150ms">
            <span class="process-phase-number">02</span>
            <p class="process-phase-en">PRODUCTION</p>
            <h3>中期 · 镜头与执行</h3>
            <ul>
              <li>设计景别、机位、轴线、运镜与构图</li>
              <li>控制角色视线、动作力度与群体调度</li>
              <li>通过草稿分镜预演动作和空间连续性</li>
              <li>分解复杂动作，建立可执行的镜头单元</li>
              <li>筛选画面并修正角色、场景与光影关系</li>
            </ul>
          </article>
          <article class="process-phase process-reveal" style="--reveal: 230ms">
            <span class="process-phase-number">03</span>
            <p class="process-phase-en">POST-PRODUCTION</p>
            <h3>后期 · 成片交付</h3>
            <ul>
              <li>重组镜头节奏，让信息与情绪同步推进</li>
              <li>用动作匹配、遮挡与声音完成转场</li>
              <li>统一色彩、材质与画面视觉密度</li>
              <li>完成配乐、环境音、动作音与混音</li>
              <li>替换失效镜头并完成版本质量把控</li>
            </ul>
          </article>
        </div>

        <div class="process-throughline process-reveal" style="--reveal: 310ms">
          <strong>贯穿全程的导演判断</strong>
          <span>审美与风格控制</span><span>叙事与节奏逻辑</span><span>角色表演与空间调度</span><span>跨环节沟通与统筹</span><span>质量把关与最终取舍</span>
        </div>
      </section>
    `,
  },
  {
    slug: 'redmoon',
    label: '赤月审判',
    html: `
      <section class="process-page" aria-labelledby="process-redmoon-title">
        <div class="process-case-head process-reveal">
          <div><p class="process-kicker">CASE 01 · ACTION & SUSPENSE</p><h2 id="process-redmoon-title">赤月审判</h2></div>
          <p>先用案发现场建立谜团，再让装备、视线和角色行动逐层接管叙事。草稿分镜的任务不是画得精致，而是提前验证信息何时出现、角色从哪里进入、高潮如何占据画面中心。</p>
        </div>
        <div class="process-beatline process-reveal" style="--reveal: 70ms"><span>发现痕迹</span><i></i><span>锁定目标</span><i></i><span>药剂显形</span><i></i><span>完成审判</span></div>
        <div class="process-case-grid">
          <aside class="process-director-notes process-reveal" style="--reveal: 130ms">
            <article><b>空间先于动作</b><p>先以俯拍和地面证据交代封锁区、调查人员与死者关系，再切入肩后视角，让观众沿人物视线进入现场。</p></article>
            <article><b>角色分层亮相</b><p>靴部入场、腰侧装备、目镜特写与正面全景逐级增加信息，避免一次性展示削弱角色压迫感。</p></article>
            <article><b>高潮回归中轴</b><p>显形与审判阶段收拢构图，把红色主体放回画面中心，让前期分散的线索形成明确视觉结论。</p></article>
            <p class="process-tool-note"><strong>AI辅助位置</strong>：根据已确定的草稿分镜生成候选画面；导演工作集中在构图筛选、动作拆解、镜头替换与连续性修正。</p>
          </aside>
          <div class="process-board-grid process-board-grid--six" aria-label="赤月审判草稿分镜">
            ${[
              ['1', '低位窥视', '用前景遮挡制造被观察感'],
              ['2', '俯拍现场', '建立车辆、人物与目标的空间关系'],
              ['3', '身份特写', '目镜与手势集中角色识别信息'],
              ['4', '剪影入场', '用披风轮廓压缩环境空间'],
              ['5', '动作触发', '局部动作作为高潮前的节奏停顿'],
              ['6', '中轴审判', '红蓝对位后把冲突收束至中心'],
            ].map(([n, title, caption], index) => `<button class="process-shot process-reveal" style="--reveal: ${190 + index * 55}ms" data-process-image="./assets/process-redmoon-${n}.webp" data-process-caption="${title}：${caption}" type="button"><img src="./assets/process-redmoon-${n}.webp" alt="赤月审判草稿分镜${n}" draggable="false"><span><b>${String(index + 1).padStart(2, '0')} ${title}</b>${caption}</span></button>`).join('')}
          </div>
        </div>
      </section>
    `,
  },
  {
    slug: 'yueshi',
    label: '粤食往生',
    html: `
      <section class="process-page" aria-labelledby="process-yueshi-title">
        <div class="process-case-head process-reveal">
          <div><p class="process-kicker">CASE 02 · SUBJECTIVE CAMERA & MATCH CUT</p><h2 id="process-yueshi-title">粤食往生</h2></div>
          <p>把食材当成拥有求生意志的主角，用主观运动连接自然、厨房、餐桌与重生。荒诞不是随机奇观，而是通过连续方向、形态匹配和动作呼应建立可读的生命循环。</p>
        </div>
        <div class="process-beatline process-reveal" style="--reveal: 70ms"><span>生命与食材</span><i></i><span>处理与烹饪</span><i></i><span>进食与凝视</span><i></i><span>循环与往生</span></div>
        <div class="process-case-grid process-case-grid--wide-board">
          <aside class="process-director-notes process-reveal" style="--reveal: 120ms">
            <article><b>主观视角</b><p>让观众始终贴近食材的移动方向与危险感受，镜头不旁观菜品，而是跟随一个试图逃离的生命。</p></article>
            <article><b>匹配转场</b><p>圆盘旋转、餐具穿越和食材形态变化共享同一动势，使跨空间跳转保持方向连续，不依赖解释性字幕。</p></article>
            <article><b>节奏对照</b><p>捕捞与处理使用短促动作，摆盘和凝视留出停顿；快慢反差把荒诞感转化为叙事压力。</p></article>
          </aside>
          <div class="process-board-grid process-board-grid--seven" aria-label="粤食往生草稿分镜">
            ${[
              ['1', '环绕建立', '圆形构图确定旋转方向'],
              ['2', '动势延续', '保持方向为下一场景蓄力'],
              ['3', '主体穿越', '用前景遮挡开始空间转换'],
              ['4', '遮挡接力', '同一形态完成视觉接缝'],
              ['5', '运动落点', '让转场结束在明确观看中心'],
              ['6', '荒诞表演', '角色动作承担情绪转折'],
              ['7', '参考拆解', '提取跟随、穿越与动作弧线'],
            ].map(([n, title, caption], index) => `<button class="process-shot process-reveal" style="--reveal: ${180 + index * 45}ms" data-process-image="./assets/process-yueshi-${n}.webp" data-process-caption="${title}：${caption}" type="button"><img src="./assets/process-yueshi-${n}.webp" alt="粤食往生草稿分镜${n}" draggable="false"><span><b>${String(index + 1).padStart(2, '0')} ${title}</b>${caption}</span></button>`).join('')}
          </div>
        </div>
      </section>
    `,
  },
  {
    slug: 'memory',
    label: '记忆褶皱',
    html: `
      <section class="process-page" aria-labelledby="process-memory-title">
        <div class="process-case-head process-reveal">
          <div><p class="process-kicker">CASE 03 · SYMBOLIC NARRATIVE</p><h2 id="process-memory-title">记忆褶皱</h2></div>
          <p>以记忆并非事实，而是带着情绪的主观投影为创作前提。把沙、积木、提线与破茧建立为连续符号，使抽象主题拥有可追踪的视觉因果。</p>
        </div>
        <div class="process-memory-layout">
          <div class="process-memory-main process-reveal" style="--reveal: 80ms">
            <button class="process-map" data-process-image="./assets/process-memory-map.webp" data-process-caption="记忆褶皱工作流：从概念文本、静帧验证到动态与剪辑" type="button"><img src="./assets/process-memory-map.webp" alt="记忆褶皱工作流图" draggable="false"></button>
            <div class="process-symbol-arc">
              <article><span>01</span><b>降生</b><p>沙从指缝流失，心跳从微弱到强烈。垂直下落与固定镜头建立无法挽回的时间感。</p></article>
              <article><span>02</span><b>受控</b><p>积木被击碎、空间被挤压。镜头由稳定转向旋转与跟随，让秩序逐步失衡。</p></article>
              <article><span>03</span><b>觉醒</b><p>提线、枷锁和破茧形成因果链。动作与声音同步增强，最终以断裂后的静默完成重生。</p></article>
            </div>
          </div>
          <aside class="process-evidence-column">
            <button class="process-evidence process-reveal" style="--reveal: 150ms" data-process-image="./assets/process-memory-motion.webp" data-process-caption="动态验证：依据分镜逐镜检查主体运动、画面方向与情绪速度" type="button"><img src="./assets/process-memory-motion.webp" alt="记忆褶皱动态验证过程" draggable="false"><span><b>动态验证</b>检查主体运动、方向与情绪速度</span></button>
            <button class="process-evidence process-reveal" style="--reveal: 220ms" data-process-image="./assets/process-memory-generation.webp" data-process-caption="镜头筛选：候选素材只作为测试，最终镜头由构图、连续性和叙事功能决定" type="button"><img src="./assets/process-memory-generation.webp" alt="记忆褶皱镜头筛选过程" draggable="false"><span><b>镜头筛选</b>以构图、连续性和叙事功能取舍素材</span></button>
            <div class="process-director-result process-reveal" style="--reveal: 290ms"><strong>导演控制重点</strong><p>符号必须在前后镜头中形成因果，而不是单独存在的视觉奇观；卡顿、加速、故障像素与环境音都用于表现记忆的断裂和重组。</p></div>
          </aside>
        </div>
      </section>
    `,
  },
  {
    slug: 'kurong',
    label: '枯荣之歌',
    html: `
      <section class="process-page" aria-labelledby="process-kurong-title">
        <div class="process-case-head process-reveal">
          <div><p class="process-kicker">CASE 04 · MUSIC-DRIVEN DIRECTION</p><h2 id="process-kurong-title">枯荣之歌</h2></div>
          <p>先分析旋律、节拍和情绪转折，再设计角色动作、镜头速度、色彩升温和群舞密度。音乐不是贴在画面后的背景，而是叙事结构本身。</p>
        </div>
        <div class="process-map-layout">
          <button class="process-map process-reveal" style="--reveal: 80ms" data-process-image="./assets/process-kurong-map.webp" data-process-caption="枯荣之歌工作流：音乐分析决定概念剧本、分镜表演与剪辑节拍" type="button"><img src="./assets/process-kurong-map.webp" alt="枯荣之歌工作流图" draggable="false"></button>
          <div class="process-music-arc">
            <article class="process-reveal" style="--reveal: 150ms"><span>弱起</span><h3>消亡</h3><p>冷色、枯木与静止构图降低运动密度，给生命能量出现留出空间。</p></article>
            <article class="process-reveal" style="--reveal: 210ms"><span>旋律上扬</span><h3>转化</h3><p>精灵显形、旋转升空并形成方向性动作，镜头由中心构图逐渐打开。</p></article>
            <article class="process-reveal" style="--reveal: 270ms"><span>热烈乐段</span><h3>新生</h3><p>群体进入、暖色扩张、动作密度提升，在节拍重音处完成群舞高潮。</p></article>
            <div class="process-director-result process-reveal" style="--reveal: 330ms"><strong>导演控制重点</strong><p>每一次景别变化和角色加入都对应音乐层次变化；群舞先设计主动作方向，再分配前中后景角色，保证热闹而不混乱。</p></div>
          </div>
        </div>
      </section>
    `,
  },
  {
    slug: 'night',
    label: '夜行无声',
    html: `
      <section class="process-page" aria-labelledby="process-night-title">
        <div class="process-case-head process-reveal">
          <div><p class="process-kicker">CASE 05 · ACTION CONTINUITY</p><h2 id="process-night-title">夜行无声</h2></div>
          <p>以追踪、潜入、压制、清剿构成行动链。镜头设计优先保证运动方向、角色走位和空间关系清楚，再把装备展示嵌入动作节点。</p>
        </div>
        <div class="process-map-layout process-map-layout--night">
          <button class="process-map process-reveal" style="--reveal: 80ms" data-process-image="./assets/process-night-map.webp" data-process-caption="夜行无声工作流：创意策划、视觉开发、分镜动态与音乐后期" type="button"><img src="./assets/process-night-map.webp" alt="夜行无声工作流图" draggable="false"></button>
          <div class="process-action-column">
            <div class="process-action-chain process-reveal" style="--reveal: 150ms"><span>追踪</span><span>潜入</span><span>压制</span><span>清剿</span></div>
            <article class="process-reveal" style="--reveal: 210ms"><b>动作轴线</b><p>以连续落脚点建立左至右运动轴，肩后视线与枪口方向始终保持在同侧，避免高速剪辑造成空间跳跃。</p></article>
            <article class="process-reveal" style="--reveal: 260ms"><b>装备叙事</b><p>特殊弹药落地与角色越过安排在同一动作中，让装备功能通过行为被理解，而不是停下讲解。</p></article>
            <article class="process-reveal" style="--reveal: 310ms"><b>限制转化</b><p>枪械镜头识别受限时，以遮挡、弱化、景别替换和动作拆分维持叙事完整，生成问题被转化为镜头调度问题。</p></article>
            <p class="process-tool-note process-reveal" style="--reveal: 360ms"><strong>导演结论</strong>：工具可以生成候选动作，但景别为什么变化、角色何时出现、观众先看哪里，必须在分镜阶段决定。</p>
          </div>
        </div>
      </section>
    `,
  },
];

const storyboardProofs = [
  ['赤月审判', '26镜', './assets/storyboard-redmoon.webp'],
  ['粤食往生', '20镜', './assets/storyboard-yueshi.webp'],
  ['记忆褶皱', '18镜', './assets/storyboard-memory.webp'],
  ['枯荣之歌', '31镜', './assets/storyboard-kurong.webp'],
  ['夜行无声', '18镜', './assets/storyboard-night.webp'],
];

const workflowStages = [
  {
    slug: 'script', label: '文字脚本', title: '文字脚本',
    summary: '先把主题、人物目标、核心冲突和情绪变化写清楚，再进入画面设计，避免制作被漂亮但无关的镜头带偏。',
    contains: '一句话命题、人物与世界规则、叙事结构、场景顺序、动作因果、情绪节拍和声音设想。',
    work: '我完成创意拆解、脚本版本筛选与改写，把抽象想法整理成可继续分镜和制作的执行文本。',
    proof: '能够先确定信息层级和观众体验，再安排镜头，而不是从生成画面反推故事。',
    evidence: [
      ['./assets/process-night-map-v2.webp', '夜行无声工作流', '从创意策划到成片的逻辑记录'],
      ['./assets/process-kurong-map-v2.webp', '枯荣之歌工作流', '音乐分析与概念剧本的关联记录'],
    ],
  },
  {
    slug: 'roughboard', label: '草图分镜', title: '草图分镜',
    summary: '草图阶段快速验证构图、方向、动作和转场，不追求精细完成度，重点是确认整条叙事能否被看懂。',
    contains: '镜头顺序、景别变化、机位、视线、运动轴、角色位置、动作起止、转场方式与大致时长。',
    work: '我绘制并整理草稿分镜，反复调整镜头数量、方向和信息先后，再把确认结果升级为正式分镜表。',
    proof: '能够在制作前发现空间跳跃、叙事断点和节奏冗余，并用镜头方案提前解决。',
    evidence: [1, 2, 3, 4, 5, 6].map((n) => [`./assets/process-redmoon-${n}.webp`, '赤月审判草稿分镜', `方案迭代 ${String(n).padStart(2, '0')}`]).concat([
      ['./assets/process-storyboard-system.webp', '草稿到正式分镜', '将视觉草案整理成可执行镜头文档', true],
    ]),
  },
  {
    slug: 'keyframe', label: '关键帧', title: '关键帧制作',
    summary: '从草图中选出决定叙事与风格的画面，锁定角色、场景、构图、色彩、光影和材质，建立动态制作的视觉标准。',
    contains: '角色设定、场景设定、构图锚点、光影方向、色彩比例、材质语言与首尾帧关系。',
    work: '我确定每场戏必须保留的视觉信息，制作并筛选关键帧，统一跨镜头的角色身份、空间和风格。',
    proof: '能够把审美判断转化为明确标准，让不同镜头属于同一个世界并服务同一条叙事线。',
    evidence: [
      ['./assets/project-redmoon-frame.png', '赤月审判关键帧', '成片视觉锚点'],
      ['./assets/yueshi-frame.png', '粤食往生关键帧', '成片视觉锚点'],
      ['./assets/project-memory-frame.png', '记忆褶皱关键帧', '成片视觉锚点'],
      ['./assets/project-kurong-frame.png', '枯荣之歌关键帧', '成片视觉锚点'],
      ['./assets/project-night-frame.png', '夜行无声关键帧', '成片视觉锚点'],
    ],
  },
  {
    slug: 'prompt', label: '视频提示词', title: '视频提示词编写', detail: true,
    summary: '以已经确认的分镜为唯一镜头依据。我先口述最终画面目标，再让 Codex 接入 SD导演 Skill 完成结构化整理，最后由我人工复核和修改。',
    contains: '分镜目标、主体表演、动作顺序、摄影机路径、速度节奏、首尾状态、空间关系和限制条件。',
    work: '我负责定义画面结果、判断镜头是否忠于分镜，并对整理后的提示词逐项检查、删改和定稿。',
    proof: '创作目标、镜头判断与最终取舍均由我完成；Skill 只把口述意图整理为更清晰、可执行的文本。',
    methodSteps: [
      ['锁定已完成分镜', '先读取镜头目的、构图、动作、机位、时长与转场关系，保证提示词不脱离整条叙事。'],
      ['口述最终画面', '由我说明主体如何表演、动作怎样发生、摄影机如何移动、速度怎样变化，以及必须保留和避免的内容。'],
      ['SD导演 Skill 整理', 'Codex 接入 SD导演 Skill，将口述内容整理为主体、环境、动作阶段、运镜、节奏、首尾状态与限制条件。'],
      ['人工复核修改', '我再次对照分镜检查轴线、空间、动作可行性与镜头方向，消除歧义后形成最终视频提示词。'],
    ],
    output: '主体与环境 · 动作阶段 · 摄影机运动 · 节奏速度 · 首尾状态 · 限制条件',
  },
  {
    slug: 'generation', label: '视频生成', title: '视频生成与筛选',
    summary: '动态素材不是一次生成即采用，而是围绕表演、构图、方向和连续性进行多轮测试、选择、替换与补拍。',
    contains: '候选镜头生成、首尾帧测试、动作可读性检查、角色一致性检查、失败镜头诊断和补充生成。',
    work: '我对候选镜头做导演筛选，保留叙事清楚且能衔接的版本；对失效镜头重新拆动作、改景别或调整遮挡。',
    proof: '能够把技术限制转化为镜头调度问题，并持续守住角色表演、空间关系和叙事功能。',
    evidence: [
      ['./assets/process-memory-generation.webp', '候选镜头筛选', '多版本生成、比较与替换记录'],
      ['./assets/process-asset-folders.webp', '视频素材管理', '按项目和阶段保留可追溯版本', true],
    ],
  },
  {
    slug: 'roughcut', label: '视频粗剪', title: '视频粗剪',
    summary: '先用可用素材搭出完整叙事，验证镜头是否必要、信息是否清楚、动作是否连续，再进入细节修饰。',
    contains: '镜头排序、时长控制、动作衔接、节奏骨架、临时声音、缺镜标记与替换清单。',
    work: '我根据分镜表进行首次组接，删除重复信息，调整镜头长短，并把无法衔接的位置反馈到补镜与重做环节。',
    proof: '能够从完整观看体验判断取舍，让单个漂亮镜头服从整体叙事与节奏。',
    evidence: [
      ['./assets/process-storyboard-system.webp', '时间与运镜依据', '正式分镜为粗剪提供镜号、时长和衔接标准', true],
      ...storyboardProofs.slice(0, 3).map(([title, count, src]) => [src, `${title} · ${count}`, '粗剪对应的正式镜头清单']),
    ],
  },
  {
    slug: 'music', label: '音乐生成', title: '音乐生成提示词', detail: true,
    summary: '我先口述成片需要的音乐节奏、曲调、乐器与情绪走向，再通过自己训练的 AI 对话框整理提示词，最后人工检查并修改。',
    contains: '情绪曲线、速度与节拍、旋律走势、乐器配置、段落结构、重音位置和与画面的关系。',
    work: '我负责确定音乐在叙事中的功能、各段情绪强度和声画重音，再对生成的提示词进行筛选与定稿。',
    proof: '音乐方向来自我对故事、节奏和镜头密度的判断；AI 对话框只承担语言整理与提示词输出。',
    methodSteps: [
      ['定义音乐目标', '根据故事阶段明确情绪曲线、节奏快慢、旋律方向、乐器质感、段落长度与需要强调的画面节点。'],
      ['口述声音设想', '由我描述观众应该感受到什么、音乐怎样进入和退出、哪类乐器占主导，以及重音落在哪些动作上。'],
      ['自训练 AI 输出', '通过我自己训练的 AI 对话框，把口述需求整理成结构完整、可直接用于音乐生成的提示词。'],
      ['人工复核修改', '我检查情绪方向、乐器层级、节奏密度和段落结构，删除空泛描述并完成最终定稿。'],
    ],
    output: '情绪曲线 · 速度与节拍 · 旋律走势 · 乐器配置 · 段落结构 · 重音位置',
  },
  {
    slug: 'finalcut', label: '最终剪辑', title: '最终剪辑与交付',
    summary: '在故事已经成立的基础上完成精剪、声音、调色、字幕和技术检查，把所有环节收束成可完整观看的作品。',
    contains: '精确卡点、动作匹配、声音混合、环境氛围、色彩统一、字幕包装、版本复核与输出。',
    work: '我完成最终镜头取舍和声画同步，逐段检查节奏、连续性与信息清晰度，并统一不同来源素材的视觉与声音。',
    proof: '能够对最终观看体验负责，从概念到交付保持同一套导演目标，并在最后阶段做出明确取舍。',
    evidence: [
      ['./assets/project-redmoon-frame.png', '赤月审判成片', '完整流程最终输出'],
      ['./assets/yueshi-frame.png', '粤食往生成片', '完整流程最终输出'],
      ['./assets/project-memory-frame.png', '记忆褶皱成片', '完整流程最终输出'],
      ['./assets/project-kurong-frame.png', '枯荣之歌成片', '完整流程最终输出'],
      ['./assets/project-night-frame.png', '夜行无声成片', '完整流程最终输出'],
    ],
  },
];

const toolGroups = [
  ['引擎与智能创作', [
    ['Unreal Engine 5', 'tool-unreal-source.png', '外部PBR资产导入，场景布局、光照、后期调节，实时渲染出图。'],
    ['Tripo AI', 'pbr/tripo-icon.png', 'AI建模网站，用于从文字或图片生成三维模型，辅助角色、道具与场景的快速视觉开发。'],
    ['ChatGPT', 'tool-chatgpt.webp', '概念脚本、分镜表和创作需求的结构化整理；由导演先确定目标，再用对话完成语言整理。'],
    ['ZCode', 'tool-zcode.webp', '脚本、页面与工作流原型辅助，让制作资料和交互展示更高效。'],
  ]],
  ['视觉开发与精度调整', [
    ['Topaz Video AI', 'tool-topaz-source.png', '视频超分与画质增强，提升成片分辨率与细节清晰度。'],
    ['Photoshop', 'tool-photoshop.webp', '关键帧合成、局部修整、构图调整与视觉方案统一。'],
    ['Midjourney', 'tool-midjourney-source.png', '视觉风格探索与关键帧画面开发，辅助建立色彩和构图参考。'],
  ]],
  ['三维资产与材质', [
    ['Maya', 'tool-maya.webp', '三维角色、场景、绑定与动画基础制作，支持镜头预演和资产调整。'],
    ['ZBrush', 'tool-zbrush.webp', '角色与道具的数字雕刻，建立高精度造型和细节结构。'],
    ['Substance 3D Painter', 'tool-substance.webp', 'PBR材质绘制与旧化细节设计，控制资产的真实质感。'],
    ['Marmoset Toolbag', 'tool-marmoset.webp', '实时材质预览、灯光展示、贴图烘焙与角色资产检查。'],
  ]],
  ['动态与后期', [
    ['Premiere Pro', 'tool-premiere.webp', '粗剪、精剪、节奏控制、声音组织与最终版本输出。'],
    ['After Effects', 'tool-ae.webp', '动态设计、合成、视觉特效与镜头细节强化。'],
    ['剪映', 'tool-capcut.webp', '快速剪辑、字幕、声音节拍和移动端版本适配。'],
  ]],
  ['音乐与声音', [
    ['ACE Studio', 'tool-ace.webp', 'AI歌声与音乐制作，按剧情段落测试旋律、情绪和声音表现。'],
  ]],
];

function workflowEvidenceCard([src, title, caption, wide], index = 0) {
  return `<button class="workflow-evidence ${wide ? 'workflow-evidence--wide' : ''} process-reveal" style="--reveal:${100 + index * 45}ms" data-process-image="${src}" data-process-caption="${title}：${caption}" type="button"><img src="${src}" alt="${title}" draggable="false"><span><b>${title}</b>${caption}</span></button>`;
}

const keyframeGroups = [
  {
    title: '枯荣之歌',
    note: '完整关键帧序列 · 11张',
    images: Array.from({length: 11}, (_, index) => `./assets/keyframe-kurong-${String(index + 1).padStart(2, '0')}.webp`),
  },
  {
    title: '粤食往生',
    note: '关键叙事画面 · 4张',
    images: Array.from({length: 4}, (_, index) => `./assets/keyframe-yueshi-${String(index + 1).padStart(2, '0')}.webp`),
  },
  {
    title: '夜行无声',
    note: '氛围与动作锚点 · 4张',
    images: Array.from({length: 4}, (_, index) => `./assets/keyframe-night-${String(index + 1).padStart(2, '0')}.webp`),
  },
  {
    title: '赤月审判',
    note: '角色与镜头锚点 · 4张',
    images: Array.from({length: 4}, (_, index) => `./assets/keyframe-redmoon-${String(index + 1).padStart(2, '0')}.webp`),
  },
];

function workflowPage(stage, index) {
  return `
    <section class="process-page workflow-detail" aria-labelledby="process-${stage.slug}-title">
      <div class="workflow-detail-head process-reveal">
        <div><p class="process-kicker">STEP ${String(index + 1).padStart(2, '0')} · DIRECTING WORKFLOW</p><h2 id="process-${stage.slug}-title">${stage.title}</h2></div>
        <p>${stage.summary}</p>
      </div>
      <div class="workflow-detail-grid">
        <div class="workflow-responsibility">
          <article class="process-reveal" style="--reveal:80ms"><h3>这一阶段包含</h3><p>${stage.contains}</p></article>
          <article class="process-reveal" style="--reveal:140ms"><h3>我负责的工作</h3><p>${stage.work}</p></article>
          <article class="director-proof process-reveal" style="--reveal:200ms"><h3>导演能力证明</h3><p>${stage.proof}</p></article>
        </div>
        <div class="workflow-evidence-grid">${stage.evidence.map(workflowEvidenceCard).join('')}</div>
      </div>
      ${stage.slug === 'finalcut' ? '<button class="workflow-open-works process-reveal" style="--reveal:360ms" data-open-works type="button">进入代表作品观看完整成片 →</button>' : ''}
    </section>`;
}

function workflowKeyframePage(stage, index) {
  return `
    <section class="process-page workflow-detail workflow-keyframes" aria-labelledby="process-${stage.slug}-title">
      <div class="workflow-detail-head process-reveal">
        <div><p class="process-kicker">STEP ${String(index + 1).padStart(2, '0')} · VISUAL ANCHORS</p><h2 id="process-${stage.slug}-title">${stage.title}</h2></div>
        <p>${stage.summary}</p>
      </div>
      <div class="keyframe-projects">
        ${keyframeGroups.map((group, groupIndex) => `
          <section class="keyframe-project process-reveal" style="--reveal:${80 + groupIndex * 65}ms" aria-labelledby="keyframe-group-${groupIndex}">
            <header class="keyframe-project-head"><h3 id="keyframe-group-${groupIndex}">${group.title}</h3><p>${group.note}</p></header>
            <div class="keyframe-grid ${group.images.length > 4 ? 'keyframe-grid--sequence' : ''}">
              ${group.images.map((src, imageIndex) => `<button class="keyframe-card" data-process-image="${src}" data-process-caption="${group.title} · 关键帧 ${String(imageIndex + 1).padStart(2, '0')}" type="button"><img src="${src}" alt="${group.title}关键帧${imageIndex + 1}" loading="lazy" draggable="false"><span>${String(imageIndex + 1).padStart(2, '0')}</span></button>`).join('')}
            </div>
          </section>`).join('')}
      </div>
      <article class="keyframe-director-proof process-reveal" style="--reveal:360ms"><p class="process-kicker">DIRECTOR CONTROL</p><h3>关键帧不是效果图集合，而是整条成片的视觉标准</h3><p>${stage.proof}</p></article>
    </section>`;
}

function workflowMethodPage(stage, index) {
  return `
    <section class="process-page workflow-detail workflow-method" aria-labelledby="process-${stage.slug}-title">
      <div class="workflow-detail-head process-reveal">
        <div><p class="process-kicker">STEP ${String(index + 1).padStart(2, '0')} · DIRECTING METHOD</p><h2 id="process-${stage.slug}-title">${stage.title}</h2></div>
        <p>${stage.summary}</p>
      </div>
      <div class="workflow-method-grid">
        <ol class="workflow-method-steps">
          ${stage.methodSteps.map(([title, description], stepIndex) => `<li class="workflow-method-step process-reveal" style="--reveal:${80 + stepIndex * 65}ms"><span>${String(stepIndex + 1).padStart(2, '0')}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join('')}
        </ol>
        <aside class="workflow-method-summary">
          <article class="process-reveal" style="--reveal:160ms"><p class="process-kicker">FINAL OUTPUT</p><h3>最终输出结构</h3><p>${stage.output}</p></article>
          <article class="process-reveal" style="--reveal:230ms"><h3>我负责的工作</h3><p>${stage.work}</p></article>
          <article class="director-proof process-reveal" style="--reveal:300ms"><h3>导演能力证明</h3><p>${stage.proof}</p></article>
        </aside>
      </div>
    </section>`;
}

function workflowStepCard(stage, index) {
  const content = `<span>${String(index + 1).padStart(2, '0')}</span><b>${stage.label}</b><small>${stage.contains.split('、').slice(0, 3).join(' · ')}</small>`;
  if (stage.detail) {
    return `<button class="workflow-step-card is-interactive process-reveal" style="--reveal:${70 + index * 35}ms" data-process-jump="${stage.slug}" type="button">${content}<em>点击查看流程</em></button>`;
  }
  return `<article class="workflow-step-card is-static process-reveal" style="--reveal:${70 + index * 35}ms">${content}<em>流程节点</em></article>`;
}

const processPages = [
  {
    slug: 'overview', label: '能力总览', html: `
      <section class="process-page workflow-overview" aria-labelledby="process-overview-title">
        <div class="workflow-hero process-reveal">
          <div><p class="process-kicker">DIRECTOR-LED PRODUCTION PIPELINE</p><h2 id="process-overview-title">八步全流程导演工作法</h2><p>我从文字脚本开始建立叙事目标，再通过分镜、关键帧、动态设计、剪辑与声音逐步收束成片。工具负责提高试错和执行效率，导演判断负责决定观众看什么、何时看见、产生什么感受。</p></div>
          <div class="workflow-metrics"><article><b>8</b><span>制作环节</span></article><article><b>5</b><span>完整项目</span></article><article><b>113</b><span>正式分镜</span></article><article><b>6</b><span>资产类别</span></article></div>
        </div>
        <div class="workflow-rail" aria-label="八步制作流程">
          ${workflowStages.map(workflowStepCard).join('')}
        </div>
        <section class="toolbox-panel process-reveal" style="--reveal:380ms" aria-labelledby="toolbox-title">
          <div class="toolbox-heading"><div><p class="process-kicker">TOOLS BY ROLE</p><h3 id="toolbox-title">工具能力</h3></div><p>按制作职责分类。将鼠标停在图标上，可查看它在我的工作流中承担什么任务。</p></div>
          <div class="tool-groups">${toolGroups.map(([group, tools]) => `<div class="tool-group"><h4>${group}</h4><div class="tool-grid">${tools.map(([name, icon, desc]) => `<article class="tool-card" tabindex="0">${['Tripo AI', 'Unreal Engine 5', 'Topaz Video AI', 'Midjourney'].includes(name) ? `<span class="tool-icon-window tool-icon-window--${name === 'Tripo AI' ? 'tripo' : name === 'Unreal Engine 5' ? 'unreal' : name === 'Midjourney' ? 'midjourney' : 'topaz'}" role="img" aria-label="${name}图标"><img src="./assets/${icon}" alt="" draggable="false"></span>` : `<img src="./assets/${icon}" alt="${name}图标" draggable="false">`}<span>${name}</span><div class="tool-tooltip"><b>${name}</b><p>${desc}</p></div></article>`).join('')}</div></div>`).join('')}</div>
        </section>
      </section>`,
  },
  ...workflowStages.filter((stage) => stage.detail).map((stage) => {
    const index = workflowStages.indexOf(stage);
    const html = stage.slug === 'keyframe'
      ? workflowKeyframePage(stage, index)
      : stage.methodSteps
        ? workflowMethodPage(stage, index)
        : workflowPage(stage, index);
    return {slug: stage.slug, label: stage.label, html};
  }),
];

let activeProcessPage = 0;
const viewedProcessPages = new Set();

function setScene(scene) {
  [introScene, hubScene, worksScene, pbrScene, projectScene, ideasScene, processScene, aboutScene].forEach((item) => {
    const active = item === scene;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-hidden', String(!active));
  });
  requestAnimationFrame(updateScrollCues);
}

function updateScrollCues() {
  const targets = [
    [processScene, processScroll, processScrollCue],
    [pbrScene, pbrScroll, pbrScrollCue],
    [ideasScene, activeProject === 'yueshi' ? yueshiProcessSheet : otherProcessSheet, ideasScrollCue]
  ];
  for (const [scene, scroll, cue] of targets) {
    const isProcessSheet = scene !== ideasScene || ideasScene.classList.contains('is-process-page');
    cue.hidden = !scene.classList.contains('is-active') || !isProcessSheet || scroll.hidden ||
      scroll.scrollTop > 24 || scroll.scrollHeight <= scroll.clientHeight + 32;
  }
}

[processScroll, pbrScroll, yueshiProcessSheet, otherProcessSheet].forEach((scroll) => {
  scroll.addEventListener('scroll', updateScrollCues, {passive: true});
});
window.addEventListener('resize', () => requestAnimationFrame(updateScrollCues));
if ('ResizeObserver' in window) {
  const scrollCueObserver = new ResizeObserver(() => requestAnimationFrame(updateScrollCues));
  [processContent, pbrContent, yueshiProcessSheet.querySelector('.ideas-process-sheet__inner'), document.querySelector('#otherProcessContent')]
    .forEach((content) => scrollCueObserver.observe(content));
}

async function startIntro() {
  if (introStarted) return;
  introStarted = true;
  resumeBackgroundMusic(900);
  window.clearInterval(glitchTimer);
  enterButton.disabled = true;
  enterButton.querySelector('.enter-hint').textContent = '正在进入';
  playFromStart(windTransitionSound);

  try {
    introVideo.currentTime = 0;
    introVideo.classList.add('is-playing');
    await introVideo.play();
    requestAnimationFrame(() => introCover.classList.add('is-hidden'));
    enterButton.style.pointerEvents = 'none';
    enterButton.style.opacity = '0';
  } catch (error) {
    windTransitionSound.pause();
    windTransitionSound.currentTime = 0;
    introStarted = false;
    enterButton.disabled = false;
    enterButton.style.pointerEvents = '';
    enterButton.style.opacity = '';
    enterButton.querySelector('.enter-hint').textContent = '再次点击进入';
  }
}

introVideo.addEventListener('ended', () => {
  windTransitionSound.pause();
  windTransitionSound.currentTime = 0;
  setScene(hubScene);
  introVideo.pause();
  introVideo.classList.remove('is-playing');
  startGlitchLoop();
});

introVideo.addEventListener('error', () => {
  if (!introStarted) return;
  windTransitionSound.pause();
  windTransitionSound.currentTime = 0;
  setScene(hubScene);
  startGlitchLoop();
});

enterButton.addEventListener('click', startIntro);

function returnToIntro() {
  windTransitionSound.pause();
  windTransitionSound.currentTime = 0;
  introVideo.pause();
  introVideo.currentTime = 0;
  introVideo.classList.remove('is-playing');
  introCover.classList.remove('is-hidden');
  introStarted = false;
  enterButton.disabled = false;
  enterButton.style.pointerEvents = '';
  enterButton.style.opacity = '';
  enterButton.querySelector('.enter-hint').textContent = '点击任意位置进入';
  startGlitchLoop();
  setScene(introScene);
}

function triggerGlitch() {
  const activeScene = [introScene, hubScene, worksScene].find((scene) => scene.classList.contains('is-active'));
  if (!activeScene || (activeScene === introScene && introStarted)) return;
  activeScene.classList.remove('is-glitching');
  requestAnimationFrame(() => {
    activeScene.classList.add('is-glitching');
    window.setTimeout(() => activeScene.classList.remove('is-glitching'), 450);
  });
}

function startGlitchLoop() {
  window.clearInterval(glitchTimer);
  glitchTimer = window.setInterval(triggerGlitch, 3000);
}

startGlitchLoop();

document.querySelectorAll('.door-hotspot').forEach((button) => {
  const name = button.dataset.door;
  const layer = doorLayers[name];
  const glowOn = () => layer.classList.add('is-glowing');
  const glowOff = () => layer.classList.remove('is-glowing');

  button.addEventListener('pointerenter', glowOn);
  button.addEventListener('pointerleave', glowOff);
  button.addEventListener('focus', glowOn);
  button.addEventListener('blur', glowOff);
  button.addEventListener('click', () => openDoor(name, button));
});

function openDoor(name, trigger) {
  if (name === 'right') {
    doorLayers.right.classList.add('is-glowing');
    worksScene.classList.add('is-entering');
    hubScene.classList.add('is-rushing');
    portalFlash.classList.add('is-active');

    window.setTimeout(() => {
      setScene(worksScene);
      requestAnimationFrame(() => worksScene.classList.remove('is-entering'));
    }, 720);

    window.setTimeout(() => {
      hubScene.classList.remove('is-rushing');
      portalFlash.classList.remove('is-active');
      doorLayers.right.classList.remove('is-glowing');
    }, 1100);
    return;
  }

  if (name === 'center') {
    doorLayers.center.classList.add('is-glowing');
    aboutScene.classList.add('is-entering');
    hubScene.classList.add('is-rushing-center');
    portalFlash.classList.add('is-active');
    playFromStart(windTransitionSound);

    window.setTimeout(() => {
      aboutScroll.scrollTop = 0;
      setScene(aboutScene);
      requestAnimationFrame(() => aboutScene.classList.remove('is-entering'));
    }, 720);

    window.setTimeout(() => {
      hubScene.classList.remove('is-rushing-center');
      portalFlash.classList.remove('is-active');
      doorLayers.center.classList.remove('is-glowing');
      windTransitionSound.pause();
      windTransitionSound.currentTime = 0;
    }, 1100);
    return;
  }

  doorLayers.left.classList.add('is-glowing');
  processScene.classList.add('is-entering');
  hubScene.classList.add('is-rushing-left');
  portalFlash.classList.add('is-active');
  playFromStart(windTransitionSound);

  window.setTimeout(() => {
    activeProcessPage = 0;
    renderProcessPage(false);
    setScene(processScene);
    requestAnimationFrame(() => processScene.classList.remove('is-entering'));
  }, 720);

  window.setTimeout(() => {
    hubScene.classList.remove('is-rushing-left');
    portalFlash.classList.remove('is-active');
    doorLayers.left.classList.remove('is-glowing');
    windTransitionSound.pause();
    windTransitionSound.currentTime = 0;
  }, 1100);
}

function renderProcessPage(playTransition = true) {
  const page = processPages[activeProcessPage];
  if (!page) return;
  processContent.classList.remove('is-switching');
  requestAnimationFrame(() => {
    processContent.classList.add('is-switching');
    window.setTimeout(() => {
      processContent.innerHTML = page.html;
      processScroll.scrollTop = 0;
      requestAnimationFrame(updateScrollCues);
      processScene.dataset.processPage = page.slug;
      processTabs.forEach((tab, index) => {
        const active = index === activeProcessPage;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-current', active ? 'page' : 'false');
      });
      processPageIndex.textContent = `${String(activeProcessPage + 1).padStart(2, '0')} / ${String(processPages.length).padStart(2, '0')}`;
      processProgressBar.style.width = `${((activeProcessPage + 1) / processPages.length) * 100}%`;
      processPrev.disabled = activeProcessPage === 0;
      processNext.disabled = activeProcessPage === processPages.length - 1;

      const firstVisit = !viewedProcessPages.has(page.slug);
      viewedProcessPages.add(page.slug);
      if (firstVisit) {
        processContent.classList.add('is-revealing');
        if (processContent.querySelector('.process-shot, .process-evidence, .workflow-evidence, .tool-card')) {
          window.setTimeout(() => playLayered(cardDealSound), 240);
        }
        window.setTimeout(() => processContent.classList.remove('is-revealing'), 1150);
      }
    }, playTransition ? 150 : 0);
  });
  window.setTimeout(() => processContent.classList.remove('is-switching'), playTransition ? 560 : 420);
}

function selectProcessPage(index) {
  if (index < 0 || index >= processPages.length || index === activeProcessPage) return;
  activeProcessPage = index;
  renderProcessPage(true);
}

processTabs.forEach((tab, index) => tab.addEventListener('click', () => selectProcessPage(index)));
processPrev.addEventListener('click', () => selectProcessPage(activeProcessPage - 1));
processNext.addEventListener('click', () => selectProcessPage(activeProcessPage + 1));

document.querySelector('#processBack').addEventListener('click', () => {
  closeProcessLightbox();
  setScene(hubScene);
});

function openAboutLightbox(src, caption) {
  aboutLightboxImage.src = src;
  aboutLightboxImage.alt = caption;
  aboutLightboxCaption.textContent = caption;
  aboutLightbox.classList.add('is-open');
  aboutLightbox.setAttribute('aria-hidden', 'false');
  aboutLightboxClose.focus();
}

function closeAboutLightbox() {
  aboutLightbox.classList.remove('is-open');
  aboutLightbox.setAttribute('aria-hidden', 'true');
  aboutLightboxImage.removeAttribute('src');
}

document.querySelector('#aboutBack').addEventListener('click', () => {
  closeAboutLightbox();
  setScene(hubScene);
});

aboutScroll.addEventListener('click', (event) => {
  const card = event.target.closest('[data-about-image]');
  if (!card) return;
  openAboutLightbox(card.dataset.aboutImage, card.dataset.aboutCaption || '证明材料');
});

aboutLightboxClose.addEventListener('click', closeAboutLightbox);
aboutLightbox.addEventListener('click', (event) => {
  if (event.target === aboutLightbox) closeAboutLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && aboutLightbox.classList.contains('is-open')) closeAboutLightbox();
});

function openProcessLightbox(src, caption, alt) {
  processLightboxImage.src = src;
  processLightboxImage.alt = alt || caption;
  processLightboxCaption.textContent = caption;
  processLightbox.classList.add('is-open');
  processLightbox.setAttribute('aria-hidden', 'false');
  processLightboxClose.focus();
}

function closeProcessLightbox() {
  processLightbox.classList.remove('is-open');
  processLightbox.setAttribute('aria-hidden', 'true');
  processLightboxImage.removeAttribute('src');
}

processContent.addEventListener('click', (event) => {
  const jump = event.target.closest('[data-process-jump]');
  if (jump) {
    const nextPage = processPages.findIndex((page) => page.slug === jump.dataset.processJump);
    if (nextPage >= 0) selectProcessPage(nextPage);
    return;
  }

  if (event.target.closest('[data-open-works]')) {
    closeProcessLightbox();
    setScene(worksScene);
    return;
  }

  const target = event.target.closest('[data-process-image]');
  if (!target) return;
  const image = target.querySelector('img');
  openProcessLightbox(target.dataset.processImage, target.dataset.processCaption || '', image?.alt || '');
});

processLightboxClose.addEventListener('click', closeProcessLightbox);
processLightbox.addEventListener('click', (event) => {
  if (event.target === processLightbox) closeProcessLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && processLightbox.classList.contains('is-open')) closeProcessLightbox();
});

renderProcessPage(false);

document.querySelector('#worksBack').addEventListener('click', () => {
  setScene(hubScene);
});

document.querySelector('#hubBack').addEventListener('click', returnToIntro);

const pbrTools = {
  tripo: {label: 'Tripo AI', image: './assets/pbr/tripo-icon.png'},
  maya: {label: 'Maya', image: './assets/tool-maya.webp'},
  zbrush: {label: 'ZBrush', image: './assets/tool-zbrush.webp'},
  painter: {label: 'Substance Painter', image: './assets/tool-substance.webp'},
  marmoset: {label: 'Marmoset Toolbag', image: './assets/tool-marmoset.webp'},
};

const pbrWorks = [
  {
    title: '美卡风格角色', number: '01', kind: '角色造型 / PBR材质',
    lead: '以表情、发型、围巾与滑板建立鲜明的角色识别；用近景和全身多角度，分别检验面部表现、服装材质与整体轮廓。',
    first: 'street-detail.png', firstLabel: '面部特写与材质贴图', second: 'street-angles.png', secondLabel: '角色全身多角度展示',
    heroCrop: {x: 0, y: 90, width: 1288, height: 676},
    steps: ['面部、头发与服装的造型层次', '围巾绒毛、外套旧化与滑板材质', '全身正侧背视角检查轮廓一致性'],
    tools: ['maya', 'zbrush', 'painter', 'marmoset'],
    workflow: [
      ['ZBrush · 高模', '雕刻高精度模型。'],
      ['Maya · 低模', '创建低精度模型，搭建基础形体与拓扑结构。'],
      ['Marmoset Toolbag · 烘焙与渲染', '将高模细节烘焙到低模，生成法线、AO 等贴图，并完成最终效果渲染。'],
      ['Substance Painter · 材质', '绘制材质贴图。'],
    ],
    texture: {file: 'street-textures-source.png', x: 1354, y: 402, width: 629, height: 414},
  },
  {
    title: '风格化AI建模+人工建模', number: '02', kind: '角色设计 / AI辅助与人工建模',
    lead: '将面部、盔甲、发型和披肩分层呈现。先看完整角色的形体与配色，再看装备和发型的独立设计，让结构与材质处理都能被清楚辨认。',
    first: 'elf-detail-v2.png', firstLabel: '角色多角度与材质贴图', second: 'elf-components.png', secondLabel: '装备、发型与配件拆件',
    heroCrop: {x: 0, y: 20, width: 1334, height: 820},
    steps: ['角色正侧背与面部特写', '护甲、披肩、发型的独立拆件', '角色与配件的色彩、材质统一'],
    tools: ['tripo', 'zbrush', 'maya', 'painter', 'marmoset'],
    note: 'AI辅助制作模型制作时间：11天',
    workflow: [
      ['Tripo 3D · AI初模', '通过 AI 建模生成基础模型。'],
      ['ZBrush · 高模', '雕刻高精度模型。'],
      ['Maya · 低模', '创建低精度模型，搭建基础形体与拓扑结构。'],
      ['Marmoset Toolbag · 烘焙与渲染', '将高模细节烘焙到低模，生成法线、AO 等贴图，并完成最终效果渲染。'],
      ['Substance Painter · 材质', '绘制材质贴图。'],
    ],
    texture: {file: 'ai-workflow-textures-source.png', x: 1407, y: 485, width: 485, height: 324},
  },
  {
    title: '硬表面建模', number: '03', kind: '硬表面建模 / PBR贴图',
    lead: '以主体建模和右侧的设计参考图并排展示，便于直接核对枪械轮廓、机械结构及色彩分区。',
    first: 'weapon-reference-source.png', firstLabel: '枪械主体与设计参考', second: 'weapon-angles.png', secondLabel: '武器六角度展示',
    heroCrop: {x: 42, y: 98, width: 1309, height: 624},
    steps: ['中模、高模与低模的结构迭代', '线缆、枪托与发光部件的层级组织', 'PBR贴图与最终渲染效果检查'],
    texture: {file: 'weapon-textures-source.png', x: 1410, y: 430, width: 578, height: 385},
    tools: ['maya', 'painter', 'marmoset'],
  },
  {
    title: '风格化临摹—瓦罗兰特角色黑梦', number: '04', kind: '人物塑造 / 转面检查',
    lead: '以不对称发型、眼部妆容和服装剪裁塑造角色性格。将半身造型与环绕转面分开陈列，集中展示正侧背轮廓及材质在不同角度下的表现。',
    reference: './assets/pbr/valorant-fade-reference.jpg',
    first: 'short-hair-detail.png', firstLabel: '角色半身、侧面与贴图', second: 'short-hair-angles.png', secondLabel: '面部与全身转面展示',
    steps: ['面部识别与发型轮廓', '外套金属边饰及面料质感', '多角度转面检验造型连续性'],
    tools: ['maya', 'zbrush', 'painter', 'marmoset'],
  },
];

function pbrCropStyle(crop) {
  return `--crop-width:${(2048 / crop.width * 100).toFixed(3)}%;--crop-left:${(-crop.x / crop.width * 100).toFixed(3)}%;--crop-top:${(-crop.y / crop.height * 100).toFixed(3)}%;aspect-ratio:${crop.width}/${crop.height}`;
}

function pbrTextureMarkup(work) {
  if (!work.texture) return '';
  return `<figure class="pbr-texture"><figcaption>部分贴图展示</figcaption><div class="pbr-crop-window" style="${pbrCropStyle(work.texture)}"><img src="./assets/pbr/${work.texture.file}" alt="${work.title}部分材质贴图" loading="lazy" /></div></figure>`;
}

function renderPbrWorks() {
  pbrNav.innerHTML = pbrWorks.map((work, index) => `
    <button type="button" data-pbr-nav="${index}" aria-current="${index === 0 ? 'true' : 'false'}"><span>${work.number}</span>${work.title}</button>
  `).join('');

  pbrContent.innerHTML = pbrWorks.map((work, index) => `
    <section class="pbr-work" id="pbrWork${index}" aria-labelledby="pbrWorkTitle${index}">
      <div class="pbr-work-heading">
        <div><p class="pbr-eyebrow">${work.number} / 04 · ${work.kind}</p><h2 id="pbrWorkTitle${index}">${work.title}</h2></div>
        <span>3D / PBR</span>
      </div>
      <div class="pbr-work-grid">
        <button type="button" class="pbr-art pbr-art--hero ${work.heroCrop ? 'pbr-art--reference' : ''}" style="--pbr-delay: 100ms; --pbr-aspect: ${work.crop || 1.54}" data-pbr-image="./assets/pbr/${work.first}" data-pbr-caption="${work.title} · ${work.firstLabel}" aria-label="查看${work.title}${work.firstLabel}原图">
          ${work.heroCrop ? `<span class="pbr-crop-window" style="${pbrCropStyle(work.heroCrop)}"><img src="./assets/pbr/${work.first}" alt="${work.title}：${work.firstLabel}" loading="lazy" /></span>` : `<img src="./assets/pbr/${work.first}" alt="${work.title}：${work.firstLabel}" loading="${index === 0 ? 'eager' : 'lazy'}" />`}
          <span class="pbr-art-label">${work.firstLabel}<em>↗ 查看原图</em></span>
        </button>
        <div class="pbr-work-notes">
          ${work.reference ? `<figure class="pbr-reference"><figcaption>临摹图片参考</figcaption><img src="${work.reference}" alt="瓦罗兰特角色黑梦原版造型参考，含正面与背面" loading="lazy" /></figure>` : work.workflow ? `<h3>全流程分析</h3><ol class="pbr-workflow">${work.workflow.map(([stage, detail]) => `<li><strong>${stage}</strong><span>${detail}</span></li>`).join('')}</ol>` : `<p>${work.lead}</p><h3>展示重点</h3><ol>${work.steps.map((step) => `<li>${step}</li>`).join('')}</ol>`}
          ${work.note ? `<small>${work.note}</small>` : ''}
          ${pbrTextureMarkup(work)}
          <div class="pbr-toolstrip" aria-label="制作工具">${work.tools.map((key, toolIndex) => `<div class="pbr-tool" style="--tool-delay: ${360 + toolIndex * 95}ms">${key === 'tripo' ? `<span class="pbr-icon-window"><img src="${pbrTools[key].image}" alt="" /></span>` : `<img src="${pbrTools[key].image}" alt="" />`}<span>${pbrTools[key].label}</span></div>`).join('')}</div>
        </div>
      </div>
      <button type="button" class="pbr-art pbr-art--sheet" style="--pbr-delay: 270ms" data-pbr-image="./assets/pbr/${work.second}" data-pbr-caption="${work.title} · ${work.secondLabel}" aria-label="查看${work.title}${work.secondLabel}原图">
        <img src="./assets/pbr/${work.second}" alt="${work.title}：${work.secondLabel}" loading="lazy" />
        <span class="pbr-art-label">${work.secondLabel}<em>↗ 查看原图</em></span>
      </button>
    </section>
  `).join('');
}

renderPbrWorks();

const pbrSections = [...pbrContent.querySelectorAll('.pbr-work')];
const pbrNavButtons = [...pbrNav.querySelectorAll('[data-pbr-nav]')];
const pbrObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    const index = pbrSections.indexOf(entry.target);
    pbrNavButtons.forEach((button, buttonIndex) => button.setAttribute('aria-current', String(index === buttonIndex)));
  });
}, {root: pbrScroll, rootMargin: '-12% 0px -46% 0px', threshold: 0});
pbrSections.forEach((section) => pbrObserver.observe(section));

pbrNav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-pbr-nav]');
  if (!button) return;
  const index = Number(button.dataset.pbrNav);
  pbrSections[index]?.scrollIntoView({behavior: 'smooth', block: 'start'});
  pbrNavButtons.forEach((item, buttonIndex) => item.setAttribute('aria-current', String(index === buttonIndex)));
});

let pbrLightboxTrigger = null;
pbrContent.addEventListener('click', (event) => {
  const art = event.target.closest('[data-pbr-image]');
  if (!art) return;
  pbrLightboxTrigger = art;
  pbrLightboxImage.src = art.dataset.pbrImage;
  pbrLightboxImage.alt = art.dataset.pbrCaption;
  pbrLightboxCaption.textContent = art.dataset.pbrCaption;
  pbrLightbox.classList.add('is-open');
  pbrLightbox.setAttribute('aria-hidden', 'false');
  pbrLightboxClose.focus();
});

function closePbrLightbox() {
  pbrLightbox.classList.remove('is-open');
  pbrLightbox.setAttribute('aria-hidden', 'true');
  pbrLightboxImage.removeAttribute('src');
  pbrLightboxTrigger?.focus();
}

pbrLightboxClose.addEventListener('click', closePbrLightbox);
pbrLightbox.addEventListener('click', (event) => {
  if (event.target === pbrLightbox) closePbrLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && pbrLightbox.classList.contains('is-open')) closePbrLightbox();
});

document.querySelector('#worksPbr').addEventListener('click', () => {
  pbrScroll.scrollTop = 0;
  pbrSections[0].classList.add('is-visible');
  pbrNavButtons.forEach((button, index) => button.setAttribute('aria-current', String(index === 0)));
  setScene(pbrScene);
  playLayered(cardDealSound);
});

document.querySelector('#pbrBack').addEventListener('click', () => {
  if (pbrLightbox.classList.contains('is-open')) closePbrLightbox();
  setScene(worksScene);
});

document.querySelector('#pbrDirectory').addEventListener('click', () => {
  if (pbrLightbox.classList.contains('is-open')) closePbrLightbox();
  setScene(hubScene);
});

document.querySelectorAll('.cave-hotspot').forEach((button) => {
  const projectName = button.dataset.project;
  const label = document.querySelector(`[data-label="${projectName}"]`);
  const selectLabel = () => label?.classList.add('is-selected');
  const clearLabel = () => label?.classList.remove('is-selected');

  button.addEventListener('pointerenter', selectLabel);
  button.addEventListener('pointerleave', clearLabel);
  button.addEventListener('focus', selectLabel);
  button.addEventListener('blur', clearLabel);
  button.addEventListener('click', () => enterProject(projectName));
});

function enterProject(projectName, {directFromIdeas = false} = {}) {
  const project = projectData[projectName];
  if (!project) return;
  silenceBackgroundMusic(680);
  activeProject = projectName;
  projectScene.dataset.project = projectName;
  descriptionPages = project.pages;
  descriptionPage = 0;
  ideasOpen.classList.toggle('is-visible', Boolean(ideasProjectData[projectName]));
  ideasOpen.setAttribute('aria-label', `打开${project.title}制作思路`);
  projectScene.setAttribute('aria-label', `${project.title}作品播放页`);
  projectFrame.src = project.frame;
  projectFrame.alt = project.frameAlt;
  projectHonors.hidden = !project.honors;
  projectHonors.textContent = project.honors || '';
  projectNameLabel.textContent = `作品名称：${project.title}`;
  projectCreated.textContent = `创作时间：${project.created}`;
  projectModels.textContent = `视频模型：${project.models}`;
  videoMissingTitle.textContent = '视频加载中';
  videoMissingDetail.textContent = '请稍候…';
  videoMissing.classList.remove('is-hidden');
  projectVideo.pause();
  projectVideo.removeAttribute('src');
  projectVideo.load();
  projectProgress.classList.remove('is-available');
  projectProgress.setAttribute('aria-hidden', 'true');
  projectProgressRange.value = '0';
  projectProgressRange.max = '0';
  if (project.video) {
    projectVideo.src = project.video;
    projectVideo.load();
    projectProgress.classList.add('is-available');
    projectProgress.setAttribute('aria-hidden', 'false');
    projectVideo.volume = 0;
    projectVideo.play().catch(() => {});
  }
  worksScene.style.setProperty('--cave-origin', project.origin);
  renderDescriptionPage();
  projectScene.classList.add('is-entering');
  if (!directFromIdeas) {
    worksScene.classList.add('is-cave-rushing');
    portalFlash.classList.add('is-active');
  }

  window.setTimeout(() => {
    backgroundMusic.volume = 0;
    setScene(projectScene);
    if (project.video) {
      projectVideo.volume = 1;
      const restartVideo = () => {
        projectVideo.currentTime = 0;
        projectVideo.play().catch(() => {});
      };
      if (projectVideo.readyState >= 1) restartVideo();
      else projectVideo.addEventListener('loadedmetadata', restartVideo, {once: true});
    }
    requestAnimationFrame(() => projectScene.classList.remove('is-entering'));
  }, directFromIdeas ? 0 : 730);

  if (!directFromIdeas) {
    window.setTimeout(() => {
      worksScene.classList.remove('is-cave-rushing');
      portalFlash.classList.remove('is-active');
    }, 1120);
  }
}

document.querySelector('#projectBack').addEventListener('click', () => {
  projectVideo.pause();
  projectVideo.volume = 1;
  setScene(worksScene);
  resumeBackgroundMusic(700);
});

function renderIdeasPage() {
  const pages = ideasProjectData[activeProject].pages;
  const page = pages[ideasPage];
  ideasPageIndex.textContent = `${String(ideasPage + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
  ideasCopyTitle.textContent = page.title;
  ideasCopyText.innerHTML = page.html;
}

function renderNightProcess() {
  const keyframes = [
    ['night-refined-01.jpg', '走廊群怪与空间纵深'],
    ['night-refined-02.jpg', '第一人称开火构图'],
    ['night-refined-03.png', '战术角色与场景光影'],
    ['night-refined-04.png', '角色装甲与夜视细节']
  ];
  const software = [
    ['剪映', 'night-tool-capcut.png', 1079, 684, 94, 91],
    ['ChatGPT', 'night-tool-chatgpt.png', 1079, 684, 94, 91],
    ['Topaz Video AI', 'night-tool-topaz.png', 1345, 682, 93, 93],
    ['Photoshop', 'night-tool-photoshop.png', 831, 529, 93, 93],
    ['ACE Studio', 'night-tool-ace.png', 570, 525, 101, 101]
  ];
  const softwareIcon = ([name, filename, x, y, width, height], index) => {
    const scale = 68 / Math.max(width, height);
    const style = `width:${(2048 * scale).toFixed(2)}px;left:${(-x * scale + (68 - width * scale) / 2).toFixed(2)}px;top:${(-y * scale + (68 - height * scale) / 2).toFixed(2)}px`;
    return `<div class="ideas-software-card" style="--tool-order:${index}"><span class="night-software-icon"><img src="./assets/${filename}" alt="${name}图标" style="${style}" loading="lazy" /></span><span>${name}</span></div>`;
  };
  otherProcessContent.innerHTML = `
    <section class="ideas-storyboard-section night-workflow-section" aria-label="夜行无声工作流">
      <div class="ideas-section-heading"><p>WORKFLOW · FROM IDEA TO DELIVERY</p><h2>《夜行无声》工作流</h2></div>
      <p class="night-process-note">从创作判断到成片交付</p>
      <ol class="night-workflow-steps">
        <li><span>01</span><strong>创意策划</strong><p>PV 参考、概念脚本与叙事链</p></li>
        <li><span>02</span><strong>角色开发</strong><p>角色、装备与哥特战术风格</p></li>
        <li><span>03</span><strong>分镜制作</strong><p>景别、构图、动作与走位</p></li>
        <li><span>04</span><strong>动态生成</strong><p>逐镜提示词与 Seedance 2.0</p></li>
        <li><span>05</span><strong>视听整合</strong><p>ACE Studio 音乐与剪映卡点</p></li>
      </ol>
      <p class="night-workflow-tools"><strong>TOOLS</strong> ChatGPT / GPT Image 2 / Seedance 2.0 / ACE Studio / 剪映</p>
      <p class="night-workflow-judgment"><strong>DIRECTOR JUDGMENT</strong> 面对枪械识别限制，以遮挡、弱化、改变景别与镜头替换维持叙事完整。</p>
      <figure class="night-workflow-map"><a href="./assets/night-workflow-map.png" target="_blank" rel="noopener" aria-label="查看夜行无声完整工作流图"><img src="./assets/night-workflow-map.png" alt="夜行无声创意策划、视觉开发、分镜与动态、音乐与后期工作流图" loading="lazy" /></a><figcaption>完整工作流图 · 点击放大查看</figcaption></figure>
    </section>
    <section class="ideas-storyboard-section night-challenge-section" aria-labelledby="nightChallengeHeading">
      <header class="night-challenge-heading">
        <p>PRODUCTION CHALLENGE</p>
        <h2 id="nightChallengeHeading">枪械镜头生成受限，如何完成动作叙事</h2>
        <p class="night-challenge-subtitle">通过多模型测试、分镜调整与后期合成，完成难以稳定生成的镜头。</p>
      </header>

      <article class="night-challenge-row night-challenge-row--problem">
        <figure class="night-challenge-figure night-challenge-figure--error">
          <div class="night-challenge-error-crop">
            <svg viewBox="0 0 1534 825" role="img" aria-label="保留视频生成界面、完整报错框与参考图缩略图，并去除下方提示词的原始生成记录" preserveAspectRatio="xMidYMid meet"><image href="./assets/night-challenge-generation-error.png" x="0" y="0" width="1534" height="1542" /></svg>
          </div>
          <figcaption>生成测试记录｜相关任务受到平台限制，未能获得可用视频。</figcaption>
        </figure>
        <div class="night-challenge-copy">
          <span>主要问题</span>
          <p>制作中，包含枪械的动作镜头多次受到平台限制，难以稳定获得可用素材，影响了原定分镜的实现。难点在于找到可执行的制作方式，同时保留动作与剧情信息。</p>
        </div>
      </article>

      <article class="night-challenge-row night-challenge-row--attempt">
        <figure class="night-challenge-figure">
          <a href="./assets/night-challenge-green-mask.png" target="_blank" rel="noopener" aria-label="放大查看绿色遮盖测试图">
            <img src="./assets/night-challenge-green-mask.png" alt="对参考图中的枪械区域进行绿色纯色遮盖的测试图" loading="lazy" />
          </a>
          <figcaption>未成功的尝试｜对参考图中的枪械区域进行纯色遮盖。</figcaption>
        </figure>
        <div class="night-challenge-copy">
          <span>尝试与判断</span>
          <p>我先后尝试纯色遮盖、模糊处理、调整为玩具枪描述，以及取消参考图、仅使用文字描述，均未形成稳定可用的方案。因此，我将制作重点转向分镜调整与后期处理。</p>
        </div>
      </article>

      <div class="night-challenge-cards" aria-label="解决办法">
        <article><span>01</span><h3>多模型测试</h3><p>测试不同模型并筛选可用素材，其中获得的片段用于成片 00:20—00:22 处。由于这一方式仍不稳定，后续结合分镜调整和后期处理完成制作。</p></article>
        <article><span>02</span><h3>调整分镜</h3><p>修改原有构图和呈现角度，减少枪械正面展示，在现有制作条件下保留动作与剧情信息。</p></article>
        <article><span>03</span><h3>后期合成</h3><p>对于仍需出现枪械的镜头，通过后期合成补入相关元素。结尾镜头采用这一方式，完成最终画面。</p></article>
      </div>

      <div class="night-challenge-application" aria-labelledby="nightChallengeApplicationHeading">
        <h3 id="nightChallengeApplicationHeading">成片中的应用</h3>
        <div class="night-challenge-final-grid">
          <figure>
            <video controls muted playsinline preload="metadata" poster="./assets/night-challenge-final-0021.jpg" aria-label="夜行无声成片二十秒到二十二秒的无声案例视频">
              <source src="./assets/night-challenge-final-0020-0022.mp4" type="video/mp4" />
            </video>
            <figcaption>成片 00:20—00:22｜多模型测试后筛选采用的片段。</figcaption>
          </figure>
          <figure>
            <video controls muted playsinline preload="metadata" poster="./assets/night-challenge-final-ending.jpg" aria-label="夜行无声结尾后期合成镜头的无声案例视频">
              <source src="./assets/night-challenge-final-ending.mp4" type="video/mp4" />
            </video>
            <figcaption>结尾镜头｜通过后期合成补入枪械元素。</figcaption>
          </figure>
        </div>
      </div>

      <aside class="night-challenge-review">
        <span>项目复盘</span>
        <p>这次制作让我认识到，需要在分镜阶段提前测试实现难度较高的镜头。当生成方式无法稳定支撑设计时，应及时调整镜头表达，并将部分画面交由后期完成，为关键镜头准备可执行的替代方案。</p>
      </aside>
    </section>
    <section class="ideas-storyboard-section night-design-section" aria-label="夜行无声角色设计与配色">
      <div class="ideas-section-heading"><p>CHARACTER DESIGN · COLOR PALETTE</p><h2>角色设计与配色</h2></div>
      <p class="night-process-note">从面部夜视装置、战术服轮廓和装备挂载出发，校准角色正面、侧面与背面的造型；以暗色皮革为主体，用冷紫与弹药蓝区分布料、金属和功能部件。</p>
      <div class="night-design-showcase">
        <figure class="ideas-process-pair night-design-card night-design-card--character" style="--reveal-order:0">
          <a href="./assets/night-character-turnaround.png" target="_blank" rel="noopener" aria-label="查看夜行无声完整角色设计图"><img src="./assets/night-character-turnaround.png" alt="夜行无声角色设计，包含面部与装备特写、正面、侧面及背面视图" loading="lazy" /></a>
          <figcaption><strong>角色设定 · 装备细节与三视图</strong></figcaption>
        </figure>
        <figure class="ideas-process-pair night-design-card night-design-card--palette" style="--reveal-order:1">
          <svg viewBox="1180 443 811 318" role="img" aria-label="夜行无声角色配色表，包含炭黑、亚光墨黑、旧皮灰黑、暗紫、冷紫高光、紫外线弹药蓝、氧化旧铜和枪铁银灰" preserveAspectRatio="xMidYMid meet"><image href="./assets/night-character-palette-source.png" x="0" y="0" width="2048" height="856" /></svg>
          <figcaption><strong>配色与材质定位</strong></figcaption>
        </figure>
      </div>
    </section>
    <section class="ideas-storyboard-section night-keyframe-section" aria-label="关键帧制作方法">
      <div class="ideas-section-heading"><p>KEYFRAME DEVELOPMENT</p><h2>关键帧制作方法</h2></div>
      <p class="night-process-note">依据精准文字分镜，一次生成 3 × 4、共 12 格的镜头画面板。筛选构图与动作后，再对选定画面进行二次处理，统一角色、机位与场景气氛。</p>
      <ol class="night-method-steps"><li>精准文字分镜：明确景别、轴线、角色动作与环境信息。</li><li>一次性生成 3 × 4、共 12 格的画面板，筛选可用构图。</li><li>二次处理入选画面，检查人物一致性、主观视角与光影关系。</li></ol>
      <div class="night-keyframe-comparison">
        <figure class="night-keyframe-board"><a href="./assets/night-storyboard-v2.webp" target="_blank" rel="noopener" aria-label="放大查看十二格画面板"><img src="./assets/night-storyboard-v2.webp" alt="夜行无声十二格镜头画面板，用于与右侧二次处理关键帧对照" loading="lazy" /></a><figcaption>12 格画面板 · 与右侧关键帧对照（非分镜表）</figcaption></figure>
        <div class="ideas-process-grid night-keyframe-grid">${keyframes.map(([filename, caption], index) => `<figure class="ideas-process-pair night-process-frame" style="--reveal-order:${index}"><img class="ideas-process-evidence" src="./assets/${filename}" alt="《夜行无声》二次处理后的关键帧：${caption}" loading="lazy" /></figure>`).join('')}</div>
      </div>
    </section>
    <section class="ideas-prompt-section night-prompt-section" aria-labelledby="nightPromptHeading">
      <div class="ideas-prompt-heading"><p>VIDEO PROMPT · 00:11—00:19</p><h2 id="nightPromptHeading">视频提示词编写</h2></div>
      <p class="night-process-note">根据自然语言口述镜头的动作目标与限制条件，交给 Codex 调用 Seedance 2.0 导演 skill 润色与整理，最后人工检查动作连续性和第一人称视角。以下展示整理过程示意与最终中英文提示词。</p>
      <div class="night-prompt-evidence">
        <figure class="night-prompt-reference"><a href="./assets/night-prompt-process.png" target="_blank" rel="noopener" aria-label="查看我输入给 AI 的内容原图"><img src="./assets/night-prompt-process.png" alt="我输入给 AI 的自然语言动作与镜头要求" loading="lazy" /></a><figcaption>我的自然语言输入 · 点击查看原图</figcaption></figure>
        <figure class="night-prompt-reference night-prompt-reference--reply"><a href="./assets/night-ai-reply-expanded.png" target="_blank" rel="noopener" aria-label="查看 AI 整理回复原图"><img src="./assets/night-ai-reply-expanded.png" alt="AI 根据输入整理出的中英文提示词回复" loading="lazy" /></a><figcaption>AI 整理回复 · 点击查看原图</figcaption></figure>
      </div>
      <p class="night-process-note">上述两图为一组输入与回复；视频制作时使用的原始图像参考已遗失，因此仅保留文字描述。</p>
    </section>
    <section class="ideas-storyboard-section night-storyboard-section" aria-label="夜行无声分镜表">
      <div class="ideas-section-heading"><p>SHOT DESIGN · 18 SHOTS</p><h2>《夜行无声》分镜表</h2></div>
      <p class="night-process-note">原始 Excel 分镜表：33 秒、16:9、18 镜。潜入追踪 → 装备亮相 → 走廊压制 → 无人机清剿 → 角色定版。表格可横向与纵向滚动。</p>
      <div class="ideas-storyboard-scroll night-storyboard-scroll" role="region" aria-label="夜行无声十八镜分镜表，可滚动" tabindex="0"><table class="ideas-storyboard-table night-storyboard-table"><thead><tr><th scope="col">镜号</th><th scope="col">分镜画面</th><th scope="col">时间／时长</th><th scope="col">景别・机位・运镜</th><th scope="col">画面内容与位置关系</th><th scope="col">光影设计</th><th scope="col">轴线与转场</th></tr></thead><tbody id="nightStoryboardBody"><tr><td colspan="7">正在载入分镜表…</td></tr></tbody></table></div>
    </section>
    <section class="ideas-software-section" aria-label="夜行无声使用的软件">
      <div class="ideas-section-heading"><p>TOOLS · PRODUCTION</p><h2>作品使用的软件</h2></div>
      <div class="ideas-software-grid">${software.map(softwareIcon).join('')}</div>
    </section>
  `;
  fetch('./assets/night-storyboard-data.json').then((response) => {
    if (!response.ok) throw new Error('分镜表文件无法读取');
    return response.json();
  }).then((storyboard) => {
    const body = otherProcessContent.querySelector('#nightStoryboardBody');
    if (!body) return;
    body.replaceChildren();
    for (const row of storyboard.rows) {
      const tr = document.createElement('tr');
      const number = document.createElement('th');
      number.scope = 'row';
      number.textContent = row.shot;
      tr.append(number);
      const visual = document.createElement('td');
      if (/^night-storyboard-shot-\d{2}\.jpg$/.test(row.image)) {
        const link = document.createElement('a');
        link.href = `./assets/${row.image}`;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `查看第 ${row.shot} 镜画面原图`);
        const img = document.createElement('img');
        img.src = link.href;
        img.alt = `《夜行无声》分镜第 ${row.shot} 镜`;
        img.loading = 'lazy';
        link.append(img);
        visual.append(link);
      }
      tr.append(visual);
      for (const key of ['time', 'camera', 'content', 'lighting', 'transition']) {
        const cell = document.createElement('td');
        cell.textContent = row[key] || '';
        tr.append(cell);
      }
      body.append(tr);
    }
  }).catch(() => {
    const body = otherProcessContent.querySelector('#nightStoryboardBody');
    if (body) body.querySelector('td').textContent = '分镜表暂时无法载入，请刷新页面。';
  });
}

function renderKurongProcess() {
  const sketchToKeyframe = [
    ['节奏与环绕构图', 'kurong-draft-01.png', 'kurong-frame-05.png'],
    ['群像动作关系', 'kurong-draft-02.png', 'kurong-frame-06-revised.png'],
    ['落叶中的精灵', 'kurong-draft-03.png', 'kurong-frame-07.png'],
    ['林间集体舞蹈', 'kurong-draft-04.png', 'kurong-frame-08.png']
  ];
  otherProcessContent.innerHTML = `
    <section class="kurong-music-section" aria-label="枯荣之歌音乐分析">
      <div class="ideas-section-heading"><p>MUSIC FIRST · RHYTHM AND EMOTION</p><h2>从音乐分析开始</h2></div>
      <p class="kurong-process-note">参考科普兰《墨西哥沙龙》的热烈舞曲气质，提取鲜明重拍与情绪起伏；再将音乐中的活力、停顿和重音转换为精灵升空、群舞与场景变化的镜头节奏。</p>
      <div class="kurong-music-grid">
        <article class="kurong-music-card"><a href="./assets/kurong-music-background.webp" target="_blank" rel="noopener" aria-label="查看曲目感受解读原图"><img src="./assets/kurong-music-photo.webp" alt="墨西哥民俗舞蹈氛围参考，舞者与暖色灯火" loading="lazy" /></a><div><span>01 / 情绪基调</span><h3>从欢庆到沉思</h3><p>从热闹的市井舞曲联想到集体舞蹈；旋律中放缓的段落成为生命消亡与转化的情绪转折，再回到明亮、热烈的新生场面。</p><a class="kurong-evidence-link" href="./assets/kurong-music-background.webp" target="_blank" rel="noopener">查看完整曲目感受分析 ↗</a></div></article>
        <article class="kurong-music-card"><a href="./assets/kurong-music-rhythm.webp" target="_blank" rel="noopener" aria-label="查看音乐节拍分析原图"><img src="./assets/kurong-music-score.webp" alt="墨西哥沙龙乐谱节拍分析参考" loading="lazy" /></a><div><span>02 / 节奏转换</span><h3>以 2/4 拍组织镜头</h3><p>分析强弱交替与重音位置，把节拍转为角色动作、运镜速度与剪辑落点；强拍推进群舞，弱拍保留轻盈的延续感。</p><a class="kurong-evidence-link" href="./assets/kurong-music-rhythm.webp" target="_blank" rel="noopener">查看完整节拍分析 ↗</a></div></article>
      </div>
    </section>
    <section class="ideas-storyboard-section kurong-comparison-section" aria-label="枯荣之歌草稿与关键帧对照">
      <div class="ideas-section-heading"><p>SKETCH → KEYFRAME</p><h2>草稿与关键帧对照</h2></div>
      <p class="kurong-process-note">四组画面按构图与动作关系配对。左侧记录节奏草图或前期视觉参考，右侧展示对应的绘画风格关键帧；点击图片可查看完整画面。</p>
      <div class="kurong-comparison-grid">${sketchToKeyframe.map(([title, draft, frame], index) => `
        <article class="kurong-comparison-pair" aria-label="第${index + 1}组：${title}">
          <div class="kurong-comparison-images">
            <figure><a href="./assets/${draft}" target="_blank" rel="noopener" aria-label="查看${title}前期草稿或参考画面"><img src="./assets/${draft}" alt="${title}的前期草稿或视觉参考" loading="lazy"></a><figcaption>草稿 / 前期参考</figcaption></figure>
            <figure><a href="./assets/${frame}" target="_blank" rel="noopener" aria-label="查看${title}关键帧"><img src="./assets/${frame}" alt="${title}的对应关键帧" loading="lazy"></a><figcaption>关键帧</figcaption></figure>
          </div>
        </article>`).join('')}</div>
    </section>
    <section class="ideas-storyboard-section kurong-judgment-section" aria-labelledby="kurongJudgmentHeading">
      <div class="ideas-section-heading"><p>DIRECTOR'S AESTHETIC DECISION</p><h2 id="kurongJudgmentHeading">导演的审美判断</h2></div>
      <div class="kurong-judgment-grid">
        <article class="kurong-judgment-card">
          <div class="kurong-judgment-images">
            <figure class="is-chosen"><a href="./assets/kurong-frame-07.png" target="_blank" rel="noopener" aria-label="查看图7最终选用版本"><img src="./assets/kurong-frame-07.png" alt="图7：冷暖与空间层次更均衡的方案" loading="lazy"></a><figcaption>图7 · 选用</figcaption></figure>
            <figure><a href="./assets/kurong-alternate-09.png" target="_blank" rel="noopener" aria-label="查看图9未采用版本"><img src="./assets/kurong-alternate-09.png" alt="图9：整体偏火热的橙红色方案" loading="lazy"></a><figcaption>图9 · 未采用</figcaption></figure>
          </div>
          <p><strong>色调与空间：</strong>选择图7。它的冷暖分布更和谐、均匀，前后景也有层次；图9的火热橙红占比过高，色彩单一，空间感不足。</p>
        </article>
        <article class="kurong-judgment-card">
          <div class="kurong-judgment-images">
            <figure class="is-chosen"><a href="./assets/kurong-choice-10.png" target="_blank" rel="noopener" aria-label="查看图10最终选用版本"><img src="./assets/kurong-choice-10.png" alt="图10：冷色空间中白色主角更醒目" loading="lazy"></a><figcaption>图10 · 选用</figcaption></figure>
            <figure><a href="./assets/kurong-alternate-11.png" target="_blank" rel="noopener" aria-label="查看图11未采用版本"><img src="./assets/kurong-alternate-11.png" alt="图11：色调更明亮的另一方案" loading="lazy"></a><figcaption>图11 · 未采用</figcaption></figure>
          </div>
          <p><strong>主角与情绪：</strong>选择图10。较深的冷色空间拉开景深，也增强白色主角与背景的对比，使视线更集中；在进入新世界前，冷色调更符合此时的情绪铺垫。</p>
        </article>
      </div>
    </section>
    <section class="ideas-storyboard-section" aria-label="枯荣之歌最终分镜表">
      <div class="ideas-section-heading"><p>FINAL STORYBOARD · 31 SHOTS</p><h2>最终分镜表</h2></div>
      <p class="kurong-process-note">依据最终分镜文件展示全部 31 镜：3 分 15 秒、16:9，从“消亡与转化”推进到“精灵集结、群体欢庆、生命新生”。可横向与纵向滚动，点击画面查看原图。</p>
      <div class="ideas-storyboard-scroll kurong-storyboard-scroll" role="region" aria-label="枯荣之歌三十一镜最终分镜表，可滚动" tabindex="0"><table class="ideas-storyboard-table"><thead><tr><th scope="col">镜号</th><th scope="col">分镜画面</th><th scope="col">时间／时长</th><th scope="col">景别・机位・运镜</th><th scope="col">画面内容与位置关系</th><th scope="col">光影设计</th><th scope="col">轴线与转场</th></tr></thead><tbody id="kurongStoryboardBody"><tr><td colspan="7">正在载入最终分镜…</td></tr></tbody></table></div>
    </section>
    <section class="ideas-storyboard-section" aria-label="枯荣之歌工作流程">
      <div class="ideas-section-heading"><p>COMPLETE WORKFLOW</p><h2>从音乐到成片</h2></div>
      <p class="kurong-process-note">音乐分析与视觉联想 → 概念剧本 → 分镜与表演设计 → 初始画面生成 → 风格统一 → 动态生成 → 音乐卡点与最终剪辑。</p>
      <figure class="kurong-workflow"><a href="./assets/kurong-workflow.webp" target="_blank" rel="noopener" aria-label="查看枯荣之歌完整工作流程图"><img src="./assets/kurong-workflow.webp" alt="枯荣之歌从音乐分析、概念剧本、分镜表演、风格统一到动画剪辑的完整工作流程" loading="lazy" /></a><figcaption>完整工作流程图 · 点击放大查看</figcaption></figure>
    </section>
  `;
  fetch('./assets/kurong-storyboard-data.json').then((response) => {
    if (!response.ok) throw new Error('枯荣之歌分镜表无法读取');
    return response.json();
  }).then((data) => {
    const body = otherProcessContent.querySelector('#kurongStoryboardBody');
    if (!body) return;
    body.replaceChildren();
    for (const row of data.rows) {
      const tr = document.createElement('tr');
      const number = document.createElement('th');
      number.scope = 'row';
      number.textContent = row.shot;
      tr.append(number);
      const visual = document.createElement('td');
      if (/^kurong-shot-\d{2}\.jpg$/.test(row.image)) {
        const link = document.createElement('a');
        link.href = `./assets/${row.image}`;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `查看第 ${row.shot} 镜画面原图`);
        const img = document.createElement('img');
        img.src = link.href;
        img.alt = `《枯荣之歌》最终分镜第 ${row.shot} 镜`;
        img.loading = 'lazy';
        link.append(img);
        visual.append(link);
      }
      tr.append(visual);
      for (const key of ['time', 'camera', 'content', 'lighting', 'transition']) {
        const cell = document.createElement('td');
        cell.textContent = row[key] || '';
        tr.append(cell);
      }
      body.append(tr);
    }
  }).catch(() => {
    const cell = otherProcessContent.querySelector('#kurongStoryboardBody td');
    if (cell) cell.textContent = '最终分镜表暂时无法载入，请刷新页面。';
  });
}

function renderMemoryProcess() {
  const software = [
    ['Midjourney', 'memory-tool-midjourney.png', 1063, 675, 95, 91],
    ['剪映', 'memory-tool-capcut.png', 1079, 683, 95, 93],
    ['After Effects', 'memory-tool-ae.png', 959, 683, 95, 93],
    ['Photoshop', 'memory-tool-photoshop.png', 831, 529, 93, 93],
    ['Maya', 'memory-tool-maya.png', 569, 525, 103, 101]
  ];
  const icon = ([name, file, x, y, w, h], order) => `<div class="ideas-software-card" style="--tool-order:${order}"><span class="memory-software-icon"><svg viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="${name}图标"><image href="./assets/${file}" x="0" y="0" width="2048" height="1535" /></svg></span><span>${name}</span></div>`;
  otherProcessContent.innerHTML = `
    <header class="ideas-process-intro memory-process-intro">
      <p class="ideas-process-kicker">PROCESS · MEMORY FOLDS</p>
      <h2>《记忆褶皱》制作过程</h2>
      <p class="memory-course-note">该作品及工作流已被选入熊新军老师的《AI实验动画》，作为案例展示。</p>
      <p>从文字分镜到画面验证，经过人工修图、建模参考、视频生成和逐镜补帧，形成最终成片。</p>
      <p class="memory-collaboration-note">该作品由二人小组合作完成，二人共同参与全流程制作。</p>
      <p class="memory-participation-note"><strong>我参与的部分：</strong>前期脚本创意、文字分镜编写、分镜草稿制作、关键帧成图制作、视频生成、AE 视频动态制作及成片剪辑。</p>
    </header>
    <section class="ideas-storyboard-section memory-early-section" aria-label="记忆褶皱最初分镜草稿">
      <div class="ideas-section-heading"><p>INITIAL STORYBOARD</p><h2>最初分镜草稿</h2></div>
      <p class="memory-process-note">最初稿按“降生、受控、觉醒、归返”组织叙事与镜头。左侧是文字草稿节选，右侧是部分关键帧；后面的最终分镜表对应实际成片。</p>
      <div class="memory-draft-frame-layout">
        <figure class="memory-early-draft"><a href="./assets/memory-early-storyboard.png" target="_blank" rel="noopener" aria-label="查看完整最初分镜草稿"><svg viewBox="236 134 572 1198" role="img" aria-label="记忆褶皱最初文字分镜草稿，已裁去周围透明区域" preserveAspectRatio="xMidYMid meet"><image href="./assets/memory-early-storyboard.png" x="0" y="0" width="1542" height="2048" /></svg></a><figcaption>最初文字分镜 · 点击查看原图</figcaption></figure>
        <div class="memory-early-frames"><div class="memory-early-frames-head"><strong>部分关键帧</strong><span>10 张 · 滚动浏览，点击放大</span></div><div class="memory-early-frames-scroll" role="region" aria-label="记忆褶皱部分关键帧，可滚动浏览" tabindex="0">${[1,2,3,4,5,6,7,9,10,11].map((originalNumber,i)=>`<a href="./assets/memory-early-keyframe-${String(originalNumber).padStart(2,'0')}.webp" target="_blank" rel="noopener" aria-label="放大查看《记忆褶皱》关键帧 ${i+1}"><img src="./assets/memory-early-keyframe-${String(originalNumber).padStart(2,'0')}.webp" alt="《记忆褶皱》部分关键帧 ${i+1}" loading="lazy" /><span>${String(i+1).padStart(2,'0')}</span></a>`).join('')}</div></div>
      </div>
    </section>
    <section class="ideas-storyboard-section memory-method-section" aria-label="记忆褶皱关键帧制作">
      <div class="ideas-section-heading"><p>KEYFRAME DEVELOPMENT</p><h2>关键帧制作与人工修订</h2></div>
      <p class="memory-process-note">依据文字分镜生成、筛选关键帧，再对入选画面做二次处理。早期出图模型难以稳定呈现人物结构与造型，因此大量画面结合建模参考，通过 Photoshop 人工修图、合成与调色来统一角色和镜头。</p>
      <div class="memory-frame-compare">
        <figure class="ideas-process-pair" style="--reveal-order:0"><img class="ideas-process-evidence" src="./assets/memory-keyframe-reference.png" alt="参考图：蓝色翅膀角色与红青色场景" loading="lazy" /><figcaption><strong>参考图 · 初始出图</strong></figcaption></figure>
        <figure class="ideas-process-pair" style="--reveal-order:1"><img class="ideas-process-evidence" src="./assets/memory-keyframe-final.png" alt="最终选用关键帧：人工修订后角色姿态、服装与翅膀颜色" loading="lazy" /><figcaption><strong>人工修改后 · 最终选用关键帧</strong></figcaption></figure>
      </div>
    </section>
    <section class="ideas-storyboard-section memory-motion-section" aria-label="记忆褶皱视频制作记录">
      <div class="ideas-section-heading"><p>VIDEO GENERATION · MOTION</p><h2>视频生成与动画补充</h2></div>
      <p class="memory-process-note">以修订后的关键帧逐镜尝试视频生成，比较动作方向、镜头衔接和节奏。对于生成模型难以完成或不够稳定的运动，使用 After Effects 制作部分动画，再进入后期剪辑。</p>
      <figure class="memory-generation-record"><a href="./assets/memory-video-making-highres.jpg" target="_blank" rel="noopener" aria-label="查看完整高清视频制作过程记录"><img src="./assets/memory-video-making-highres.jpg" alt="记忆褶皱视频生成工作台与多镜头产出记录" loading="lazy" /></a><figcaption>逐镜生成与版本比对 · 点击查看高清原图</figcaption></figure>
    </section>
    <section class="ideas-storyboard-section memory-storyboard-section" aria-label="记忆褶皱最终分镜表">
      <div class="ideas-section-heading"><p>FINAL STORYBOARD · 18 SHOTS</p><h2>最终分镜表</h2></div>
      <p class="memory-process-note">根据删减后的成片画面重新校准：全长 2 分 18.7 秒、16:9、18 镜。表格可滚动，点击分镜画面查看原图。</p>
      <div class="ideas-storyboard-scroll" role="region" aria-label="记忆褶皱十八镜最终分镜表，可滚动" tabindex="0"><table class="ideas-storyboard-table"><thead><tr><th scope="col">镜号</th><th scope="col">分镜画面</th><th scope="col">时间／时长</th><th scope="col">景别・机位・运镜</th><th scope="col">画面内容与位置关系</th><th scope="col">光影设计</th><th scope="col">轴线与转场</th></tr></thead><tbody id="memoryStoryboardBody"><tr><td colspan="7">正在载入最终分镜…</td></tr></tbody></table></div>
    </section>
    <section class="ideas-software-section memory-software-section" aria-label="记忆褶皱使用的软件">
      <div class="ideas-section-heading"><p>TOOLS · PRODUCTION</p><h2>作品使用的软件</h2></div>
      <div class="ideas-software-grid">${software.map(icon).join('')}</div>
    </section>
  `;
  fetch('./assets/memory-storyboard-data.json').then(response => {
    if (!response.ok) throw new Error('记忆褶皱分镜表无法读取');
    return response.json();
  }).then(data => {
    const body = otherProcessContent.querySelector('#memoryStoryboardBody');
    if (!body) return;
    body.replaceChildren();
    for (const row of data.rows) {
      const tr = document.createElement('tr');
      const number = document.createElement('th');
      number.scope = 'row';
      number.textContent = row.shot;
      tr.append(number);
      const visual = document.createElement('td');
      if (/^memory-storyboard-source-\d{2}\.webp$/.test(row.image)) {
        const link = document.createElement('a');
        link.href = `./assets/${row.image}`;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `查看第 ${row.shot} 镜画面原图`);
        const img = document.createElement('img');
        img.src = link.href;
        img.alt = `《记忆褶皱》最终分镜第 ${row.shot} 镜`;
        img.loading = 'lazy';
        link.append(img);
        visual.append(link);
      }
      tr.append(visual);
      for (const key of ['time', 'camera', 'content', 'lighting', 'transition']) {
        const cell = document.createElement('td');
        cell.textContent = row[key] || '';
        tr.append(cell);
      }
      body.append(tr);
    }
  }).catch(() => {
    const cell = otherProcessContent.querySelector('#memoryStoryboardBody td');
    if (cell) cell.textContent = '最终分镜表暂时无法载入，请刷新页面。';
  });
}

function renderRedmoonProcess() {
  const shotNotes = [
    ['交代故事发生空间、时代环境与事件背景，用远景营造压抑氛围，确立雨夜都市世界观基调。', 70, 175],
    ['镜头凸显异常样本状态，结合前景报纸内容交代世界观设定，并引出猎人职业与红色药剂设计。', 748, 175],
    ['近景交代普通办案人员负责封锁现场、记录与取证；随后转向主角，他从异常线索中主动追查真相。职责与行动目标的对照，让主角成为叙事焦点。', 1426, 175],
    ['全景交代主角出场，框架式构图突出主体剪影，完成猎人正式亮相。', 70, 639],
    ['第一人称带入视角交代主角右眼夜视仪，观察异常生命体留下的信息素并进行追踪分析。', 748, 639],
    ['人物定格收尾，面部特写锁定角色神态与标志性装备，强化冷峻危险的人设标签。', 1426, 639]
  ];
  const crop = (file, width, height, x, y, w, h, label) => `<svg viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="${label}"><image href="./assets/${file}" x="0" y="0" width="${width}" height="${height}" /></svg>`;
  const shots = shotNotes.map(([note, x, y], i) => `<figure class="redmoon-shot"><div class="redmoon-shot-image">${crop('redmoon-shot-analysis.png', 2048, 1124, x, y, 594, 220, `镜头 ${i + 1} 的画面`)}</div><figcaption><span>SHOT ${String(i + 1).padStart(2, '0')}</span><p>${note}</p></figcaption></figure>`).join('');
  const draftToFrame = [
    ['侦察视角', 'redmoon-draft-01.png', 'redmoon-frame-01.jpg'],
    ['主角背影', 'redmoon-draft-02.png', 'redmoon-frame-02.jpg'],
    ['面部近景', 'redmoon-draft-03.png', 'redmoon-frame-03.png'],
    ['雨夜现场', 'redmoon-draft-04.png', 'redmoon-frame-04.jpg'],
  ];
  otherProcessContent.innerHTML = `
    <header class="ideas-process-intro redmoon-process-intro">
      <p class="ideas-process-kicker">PROCESS · RED MOON</p>
      <h2>《赤月审判》制作过程</h2>
      <p>从角色形象、装备功能到雨夜场景的镜头设计，逐步确立人物身份与行动叙事。</p>
    </header>
    <section class="ideas-storyboard-section redmoon-design-section" aria-label="赤月审判角色形象设计">
      <div class="ideas-section-heading"><p>CHARACTER DESIGN</p><h2>主角形象设计</h2></div>
      <figure class="redmoon-character"><a href="./assets/redmoon-protagonist-design.png" target="_blank" rel="noopener" aria-label="查看完整主角形象设计"><img src="./assets/redmoon-protagonist-design.png" alt="主角的全身形象、正侧背视图，以及面部和装备细节" loading="lazy" /></a><figcaption>全身造型、多视角与装备细节</figcaption></figure>
      <div class="ideas-section-heading redmoon-subheading"><p>NON-HUMAN FORM</p><h2>非人形象设计</h2></div>
      <figure class="redmoon-character"><a href="./assets/redmoon-nonhuman-design.png" target="_blank" rel="noopener" aria-label="查看完整非人形象设计"><img src="./assets/redmoon-nonhuman-design.png" alt="非人形态的伪装正侧背视图、真实形态与材质细节" loading="lazy" /></a><figcaption>伪装形态与真实形态对照</figcaption></figure>
    </section>
    <section class="ideas-storyboard-section redmoon-device-section" aria-label="赤月审判装备设计概念">
      <div class="ideas-section-heading"><p>EQUIPMENT DEVELOPMENT</p><h2>装备与功能设计</h2></div>
      <div class="redmoon-device-row">
        <div class="redmoon-device-visual">${crop('redmoon-tracker-concept.png',2048,1127,71,187,764,378,'主角面部的红色生物信息追踪器')}${crop('redmoon-tracker-concept.png',2048,1127,71,626,1090,402,'生物信息追踪器的夜视分析画面')}</div>
        <div class="redmoon-device-copy"><h3>生物信息追踪器</h3><p class="redmoon-label">核心功能</p><ol><li>夜视扫描 / NVG 模式一键切换</li><li>热成像与红外信号实时监测</li><li>感染识别与异常目标自动锁定</li><li>弱点分析与 HUD 战术投影</li><li>用于追踪夜间高速目标</li></ol><p class="redmoon-label">侦察档案</p><ol><li>多路 CAM 编号定点采集</li><li>多倍率数码变焦与分区放大</li><li>红色残留物识别与结果标注</li><li>MOTION 记录与 TARGET 锁定</li><li>SECTOR 网格与 XY 坐标定位</li><li>异常事件现场标签归档</li></ol></div>
      </div>
      <div class="redmoon-device-row redmoon-drone-row">
        <div class="redmoon-device-visual redmoon-drone-visual"><div class="redmoon-drone-top">${crop('redmoon-drone-concept.png',2048,1128,210,259,338,337,'旋刃飞行器单体设定')}${crop('redmoon-drone-concept.png',2048,1128,751,166,591,301,'旋刃飞行器在主角装备上的细节')}${crop('redmoon-drone-concept.png',2048,1128,1383,166,589,301,'旋刃飞行器在动作镜头中的应用')}</div>${crop('redmoon-drone-concept.png',2048,1128,751,518,1221,347,'向旋刃飞行器注入红色药剂模块的特写')}</div>
        <div class="redmoon-device-copy"><h3>旋刃飞行器</h3><p>近未来军事科技 · 高机动特战装备 · 可信幻想风格</p><p class="redmoon-label">改造模块</p><ol><li>半智能追踪模块</li><li>红外热源识别</li><li>夜战静音结构</li><li>高速切割刀刃</li><li>哥特化视觉语言</li></ol><p class="redmoon-device-usage"><strong>使用方法</strong> 将红色药剂模块放入飞行器中心；设备接触目标区域后释放雾化药剂，使异常生命体显露特征并进入短时静置状态。</p></div>
      </div>
    </section>
    <section class="ideas-storyboard-section redmoon-breakdown-section" aria-label="赤月审判部分镜头解读">
      <div class="ideas-section-heading"><p>SHOT BREAKDOWN</p><h2>部分镜头解读</h2></div>
      <div class="redmoon-shot-grid">${shots}</div>
    </section>
    <section class="ideas-storyboard-section redmoon-storyboard-section" aria-label="赤月审判完整分镜表">
      <div class="ideas-section-heading"><p>STORYBOARD · 26 SHOTS</p><h2>完整分镜表</h2></div>
      <p class="redmoon-storyboard-note">全片 26 镜，时长 46.77 秒。滚动查看镜头图、时间、机位、画面内容、光影设计与转场；点击镜头图可放大。</p>
      <div class="ideas-storyboard-scroll redmoon-storyboard-scroll" role="region" aria-label="赤月审判26镜完整分镜表，可横向和纵向滚动" tabindex="0"><table class="ideas-storyboard-table"><thead><tr><th scope="col">镜号</th><th scope="col">分镜画面</th><th scope="col">时间／时长</th><th scope="col">景别・机位・运镜</th><th scope="col">画面内容与位置关系</th><th scope="col">光影设计</th><th scope="col">轴线与转场</th></tr></thead><tbody id="redmoonStoryboardBody"><tr><td colspan="7">正在载入分镜表…</td></tr></tbody></table></div>
      <a class="redmoon-storyboard-download" href="./assets/redmoon-storyboard.xlsx" download>下载完整分镜表（Excel）</a>
    </section>
    <section class="ideas-storyboard-section redmoon-draft-section" aria-labelledby="redmoonDraftHeading">
      <div class="ideas-section-heading"><p>SKETCH → KEYFRAME</p><h2 id="redmoonDraftHeading">从分镜草稿到关键帧制作</h2></div>
      <p class="redmoon-draft-intro">四组画面对照：左侧是构图与机位的简笔草稿，右侧是据此制作的关键帧。</p>
      <div class="redmoon-draft-grid">${draftToFrame.map(([name, draft, frame], index) => `
        <article class="redmoon-draft-pair" aria-label="第${index + 1}组：${name}">
          <div class="redmoon-draft-pair-heading"><span>${String(index + 1).padStart(2, '0')}</span><h3>${name}</h3></div>
          <div class="redmoon-draft-pair-images">
            <figure><a href="./assets/${draft}" target="_blank" rel="noopener" aria-label="放大查看${name}分镜草稿"><img src="./assets/${draft}" alt="${name}的简笔手绘分镜草稿" loading="lazy"></a><figcaption>分镜草稿</figcaption></figure>
            <figure><a href="./assets/${frame}" target="_blank" rel="noopener" aria-label="放大查看${name}关键帧"><img src="./assets/${frame}" alt="${name}的对应关键帧" loading="lazy"></a><figcaption>对应关键帧</figcaption></figure>
          </div>
        </article>`).join('')}</div>
      <aside class="redmoon-draft-decision" aria-label="主角出场镜头的制作难点">
        <span>制作难点 · 主角出场</span>
        <p>最初计划用跟随环绕的连续镜头展示主角出场，但 Seedance 2.0 难以稳定保持镜头轨迹与人物位置的连续性。最终将长镜头拆为多个短镜头，通过现场空间、主角背影、侦察视角与面部近景逐步揭示身份，再用景别变化和剪辑节奏衔接，让出场更清晰、有力量。</p>
      </aside>
    </section>
    <section class="ideas-storyboard-section" aria-label="赤月审判关键帧展示">
      <div class="ideas-section-heading"><p>KEYFRAMES</p><h2>关键帧展示</h2></div>
      <div class="ideas-process-grid">${Array.from({length:4},(_,i)=>`<figure class="ideas-process-pair" style="--reveal-order:${i+1}"><img class="ideas-process-evidence" src="./assets/keyframe-redmoon-${String(i+1).padStart(2,'0')}.webp" alt="《赤月审判》关键帧 ${i+1}" loading="lazy" /><figcaption><strong>关键帧 ${String(i+1).padStart(2,'0')}</strong></figcaption></figure>`).join('')}</div>
    </section>
  `;
  fetch('./assets/redmoon-storyboard-data.json').then(response => {
    if (!response.ok) throw new Error('赤月审判分镜表无法读取');
    return response.json();
  }).then(rows => {
    const body = otherProcessContent.querySelector('#redmoonStoryboardBody');
    if (!body) return;
    body.replaceChildren();
    for (const row of rows) {
      const tr = document.createElement('tr');
      const number = document.createElement('th');
      number.scope = 'row';
      number.textContent = row.shot;
      tr.append(number);
      const visual = document.createElement('td');
      if (/^redmoon-storyboard-shot-\d{2}\.jpg$/.test(row.image)) {
        const link = document.createElement('a');
        link.href = `./assets/${row.image}`;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `放大查看第 ${row.shot} 镜`);
        const img = document.createElement('img');
        img.src = link.href;
        img.alt = `《赤月审判》第 ${row.shot} 镜分镜画面`;
        img.loading = 'lazy';
        link.append(img);
        visual.append(link);
      }
      tr.append(visual);
      for (const key of ['time', 'camera', 'content', 'lighting', 'transition']) {
        const cell = document.createElement('td');
        cell.textContent = row[key] || '';
        tr.append(cell);
      }
      body.append(tr);
    }
  }).catch(() => {
    const cell = otherProcessContent.querySelector('#redmoonStoryboardBody td');
    if (cell) cell.textContent = '分镜表暂时无法载入，请刷新页面。';
  });
}

function renderOtherProcess() {
  if (activeProject === 'night') {
    renderNightProcess();
    return;
  }
  if (activeProject === 'kurong') {
    renderKurongProcess();
    return;
  }
  if (activeProject === 'memory') {
    renderMemoryProcess();
    return;
  }
  if (activeProject === 'redmoon') {
    renderRedmoonProcess();
    return;
  }
  const material = processMaterials[activeProject];
  if (!material) return;
  const project = projectContent[activeProject];
  const image = (filename, caption, order) => `<figure class="ideas-process-pair" style="--reveal-order:${order}"><img class="ideas-process-evidence" src="./assets/${filename}" alt="${project.title}：${caption}" loading="lazy" /><figcaption><strong>${caption}</strong></figcaption></figure>`;
  const frames = material.frames.map((filename, index) => image(filename, `关键帧 ${String(index + 1).padStart(2, '0')}`, index + 1));
  const development = material.process.map((filename, index) => image(filename, `制作资料 ${String(index + 1).padStart(2, '0')}`, index + 1));
  otherProcessContent.innerHTML = `
    <header class="ideas-process-intro">
      <p class="ideas-process-kicker">PROCESS · ${project.title}</p>
      <h2>从分镜到画面</h2>
      <p>${project.lead}</p>
    </header>
    <section class="ideas-storyboard-section" aria-label="分镜资料">
      <div class="ideas-section-heading"><p>STORYBOARD</p><h2>分镜资料</h2></div>
      <figure class="ideas-process-pair ideas-process-pair--storyboard" style="--reveal-order:0">
        <img class="ideas-process-evidence" src="./assets/${material.storyboard}" alt="${project.title}分镜资料" loading="lazy" />
        <figcaption><strong>${project.title} · 分镜设计</strong></figcaption>
      </figure>
    </section>
    ${frames.length ? `<section class="ideas-storyboard-section" aria-label="关键帧展示"><div class="ideas-section-heading"><p>KEYFRAMES</p><h2>关键帧展示</h2></div><div class="ideas-process-grid">${frames.join('')}</div></section>` : ''}
    ${development.length ? `<section class="ideas-storyboard-section" aria-label="制作资料"><div class="ideas-section-heading"><p>DEVELOPMENT</p><h2>制作资料</h2></div><div class="ideas-process-grid">${development.join('')}</div></section>` : ''}
  `;
}

function renderIdeasSheet() {
  const isProcess = ideasSheet === 1;
  const isYueshiProcess = activeProject === 'yueshi' && isProcess;
  ideasScene.classList.toggle('is-process-page', isProcess);
  ideasHeadingTitle.textContent = isProcess ? '作品制作过程' : '作品创作思路';
  yueshiProcessSheet.hidden = !isYueshiProcess;
  otherProcessSheet.hidden = !isProcess || isYueshiProcess;
  ideasTopNext.hidden = isProcess;
  ideasNextProject.classList.toggle('is-visible', isProcess);
  ideasNextProject.hidden = !isProcess;
  const following = nextPortfolioWork[activeProject];
  ideasNextProject.textContent = following ? '进入下一个作品' : '其他作品展示';
  ideasNextProject.setAttribute('aria-label', following ? `进入下一个作品《${projectData[following].title}》` : '其他作品展示：进入PBR三维制作');
  if (isProcess) {
    const sheet = isYueshiProcess ? yueshiProcessSheet : otherProcessSheet;
    sheet.scrollTop = 0;
    sheet.classList.remove('is-revealing');
    void sheet.offsetWidth;
    sheet.classList.add('is-revealing');
    window.setTimeout(() => playLayered(cardDealSound), 180);
    window.setTimeout(() => playLayered(cardDealSound), 475);
  }
  requestAnimationFrame(updateScrollCues);
}

function prepareIdeasProject() {
  const data = ideasProjectData[activeProject];
  ideasScene.dataset.ideasProject = activeProject;
  ideasScene.setAttribute('aria-label', data.label);
  ideasBackground.src = data.background;
  ideasGalleries.forEach((gallery) => gallery.classList.toggle('is-current', gallery.dataset.ideasProject === activeProject));
  activeIdeasGallery = ideasGalleries.find((gallery) => gallery.dataset.ideasProject === activeProject);
  renderOtherProcess();
}

function dealOnce() {
  if (!activeIdeasGallery || dealtIdeasProjects.has(activeProject)) return;
  const gallery = activeIdeasGallery;
  dealtIdeasProjects.add(activeProject);
  gallery.classList.remove('is-settled');
  gallery.classList.add('is-dealing');
  [...gallery.querySelectorAll('.idea-card')].forEach((card) => {
    const delay = Number.parseFloat(card.style.getPropertyValue('--deal')) || 0;
    window.setTimeout(() => playLayered(cardDealSound), delay + 90);
  });
  window.setTimeout(() => {
    gallery.classList.remove('is-dealing');
    gallery.classList.add('is-settled');
  }, 1800);
}

function openIdeas() {
  if (!ideasProjectData[activeProject]) return;
  playFromStart(bookFlipSound);
  projectVideo.pause();
  resumeBackgroundMusic(700);
  ideasPage = 0;
  ideasSheet = 0;
  prepareIdeasProject();
  renderIdeasPage();
  renderIdeasSheet();
  projectScene.classList.add('is-page-flipping');
  window.setTimeout(() => {
    ideasScene.classList.add('is-page-entering');
    setScene(ideasScene);
    dealOnce();
    window.setTimeout(() => ideasScene.classList.remove('is-page-entering'), 760);
  }, 360);
  window.setTimeout(() => projectScene.classList.remove('is-page-flipping'), 900);
}

function closeIdeas() {
  playFromStart(bookFlipSound);
  ideasScene.classList.add('is-page-flipping-back');
  window.setTimeout(() => {
    projectScene.classList.add('is-page-returning');
    setScene(projectScene);
    window.setTimeout(() => projectScene.classList.remove('is-page-returning'), 740);
    if (!projectVideo.ended) projectVideo.play().catch(() => {});
  }, 330);
  window.setTimeout(() => ideasScene.classList.remove('is-page-flipping-back'), 900);
}

ideasOpen.addEventListener('click', openIdeas);
ideasBack.addEventListener('click', () => {
  if (ideasSheet === 1) turnIdeasSheet(0);
  else closeIdeas();
});
ideasTopNext.addEventListener('click', () => turnIdeasSheet(1));
ideasNextProject.addEventListener('click', () => {
  if (ideasSheet !== 1 || ideasScene.classList.contains('is-sheet-exiting')) return;
  playFromStart(bookFlipSound);
  ideasScene.classList.add('is-sheet-exiting');
  window.setTimeout(() => {
    ideasScene.classList.remove('is-sheet-exiting');
    const following = nextPortfolioWork[activeProject];
    if (following) {
      enterProject(following, {directFromIdeas: true});
    } else {
      pbrScroll.scrollTop = 0;
      pbrSections[0].classList.add('is-visible');
      pbrNavButtons.forEach((button, index) => button.setAttribute('aria-current', String(index === 0)));
      setScene(pbrScene);
      playLayered(cardDealSound);
    }
  }, 390);
});

function turnIdeasSheet(nextSheet) {
  if (nextSheet === ideasSheet || ideasScene.classList.contains('is-sheet-exiting') || ideasScene.classList.contains('is-sheet-entering')) return;
  playFromStart(bookFlipSound);
  ideasScene.classList.add('is-sheet-exiting');
  window.setTimeout(() => {
    ideasSheet = nextSheet;
    renderIdeasSheet();
    ideasScene.classList.remove('is-sheet-exiting');
    ideasScene.classList.add('is-sheet-entering');
    window.setTimeout(() => ideasScene.classList.remove('is-sheet-entering'), 640);
  }, 390);
}

function turnIdeasText(direction) {
  if (ideasSheet !== 0) return;
  ideasCopy.classList.remove('is-turning');
  requestAnimationFrame(() => {
    ideasCopy.classList.add('is-turning');
    window.setTimeout(() => {
      const pages = ideasProjectData[activeProject].pages;
      ideasPage = (ideasPage + direction + pages.length) % pages.length;
      renderIdeasPage();
    }, 125);
  });
}

ideasPrev.addEventListener('click', () => turnIdeasText(-1));
ideasNext.addEventListener('click', () => turnIdeasText(1));

document.querySelectorAll('.idea-card').forEach((card) => {
  card.addEventListener('click', () => card.blur());
});

renderIdeasPage();

function renderDescriptionPage() {
  descriptionPageIndex.textContent = `${String(descriptionPage + 1).padStart(2, '0')} / ${String(descriptionPages.length).padStart(2, '0')}`;
  descriptionText.textContent = descriptionPages[descriptionPage];
}

function turnDescription(direction) {
  const copy = descriptionText.parentElement;
  copy.classList.remove('is-turning');
  requestAnimationFrame(() => {
    copy.classList.add('is-turning');
    window.setTimeout(() => {
      descriptionPage = (descriptionPage + direction + descriptionPages.length) % descriptionPages.length;
      renderDescriptionPage();
    }, 125);
  });
}

descriptionPrev.addEventListener('click', () => turnDescription(-1));
descriptionNext.addEventListener('click', () => turnDescription(1));

projectVideo.addEventListener('loadeddata', () => videoMissing.classList.add('is-hidden'));
projectVideo.addEventListener('error', () => {
  if (!projectVideo.getAttribute('src')) return;
  videoMissingTitle.textContent = '视频加载失败';
  videoMissingDetail.textContent = '请稍后重试';
  videoMissing.classList.remove('is-hidden');
  if (projectScene.classList.contains('is-active')) resumeBackgroundMusic(700);
});
projectVideo.addEventListener('play', () => {
  if (projectScene.classList.contains('is-active')) silenceBackgroundMusic(250);
});
projectVideo.addEventListener('ended', () => {
  if (projectScene.classList.contains('is-active')) resumeBackgroundMusic(700);
});
projectVideo.addEventListener('loadedmetadata', () => {
  projectProgressRange.max = String(projectVideo.duration || 0);
});
projectVideo.addEventListener('timeupdate', () => {
  if (!projectProgressRange.matches(':active')) projectProgressRange.value = String(projectVideo.currentTime);
});
projectProgressRange.addEventListener('input', () => {
  projectVideo.currentTime = Number(projectProgressRange.value);
});
projectVideo.addEventListener('click', () => {
  if (!projectVideo.currentSrc) return;
  if (projectVideo.paused) projectVideo.play().catch(() => {});
  else projectVideo.pause();
});
renderDescriptionPage();

function openPanel(markup, trigger) {
  panelReturnFocus = trigger;
  panelBody.innerHTML = markup;
  contentPanel.classList.add('is-open');
  contentPanel.setAttribute('aria-hidden', 'false');
  panelClose.focus();
}

function closePanel() {
  contentPanel.classList.remove('is-open');
  contentPanel.setAttribute('aria-hidden', 'true');
  if (panelReturnFocus) panelReturnFocus.focus();
}

panelClose.addEventListener('click', closePanel);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contentPanel.classList.contains('is-open')) closePanel();
});

function aboutMarkup() {
  return `
    <p class="panel-kicker">ABOUT THE DIRECTOR</p>
    <h1 class="panel-title">杨晓璨</h1>
    <p class="panel-lead">中央美术学院动画专业2027届本科生，专注导演、分镜设计与AIGC视觉创作。以视听语言为核心，整合角色表演、三维视觉、音乐音效和后期剪辑，将文字需求转化为具有情绪与叙事张力的完整影像。</p>
    <div class="panel-grid">
      <article class="info-card"><h3>内容理解与视觉转化</h3><p>从剧本、人物设定和项目需求中提炼核心命题，将抽象概念转化为可执行的剧情节拍、镜头设计与视觉方案。</p></article>
      <article class="info-card"><h3>表演、镜头与音乐控制</h3><p>通过景别、机位、轴线、运镜和角色动作建立观看节奏，并利用音乐与剪辑推动情绪变化。</p></article>
      <article class="info-card"><h3>全流程制作与交付</h3><p>具备从需求拆解、剧本和分镜，到动态生成、音乐音效、剪辑修改与最终交付的完整执行能力。</p></article>
    </div>
    <p class="panel-lead">我把AIGC视为可以被导演和调度的影像生产工具。我的关注点不仅是画面是否好看，更是角色为什么行动、镜头为什么存在，以及每一次视听变化能否准确传达情绪。</p>
  `;
}

function processMarkup() {
  return `
    <p class="panel-kicker">FULL-PROCESS CAPABILITY</p>
    <h1 class="panel-title">从文字需求到完整成片</h1>
    <p class="panel-lead">通过真实项目拆解导演判断、分镜设计、AIGC画面控制和最终交付过程，证明每一个镜头如何从概念变成可观看的影像。</p>
    <ol class="process-list">
      <li><strong>需求理解与创意转化</strong><span>拆解项目目标、受众和人物关系，提炼一句话命题、情绪关键词与视觉方向。</span></li>
      <li><strong>剧本与叙事结构</strong><span>补全必要信息，重组剧情节拍，比较初版与最终版脚本，明确每一段的叙事功能。</span></li>
      <li><strong>文字与画面分镜</strong><span>设计景别、机位、轴线、运镜、人物站位、镜头时长、转场与声音关系。</span></li>
      <li><strong>角色表演与视听节奏</strong><span>控制表情、动作、视线和群体调度，使表演与音乐节拍、剪辑密度共同推动情绪。</span></li>
      <li><strong>AIGC画面与动态控制</strong><span>建立角色和场景锚点，处理一致性、动作拆分、首尾帧衔接、局部重绘与结构修复。</span></li>
      <li><strong>后期整合与交付</strong><span>完成素材筛选、失败镜头替换、剪辑、音乐音效、调色、包装和不同画幅适配。</span></li>
    </ol>
  `;
}

function projectMarkup(project) {
  return `
    <p class="panel-kicker">SELECTED WORK</p>
    <h1 class="panel-title">${project.title}</h1>
    <p class="panel-lead"><strong>${project.kicker}</strong><br />${project.lead}</p>
    <div class="project-meta">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
  `;
}
