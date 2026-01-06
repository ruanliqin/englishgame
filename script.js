// ==================== 全局变量 ====================
let currentWords = []; // 当前学习的单词列表
let editingWordIndex = -1; // 正在编辑的单词索引
let currentGameType = ''; // 当前游戏类型

// ==================== 音频解锁机制 ====================
// 全局解锁音频
let unlockAudio = null;
function unlockAudioPlayback() {
    if (unlockAudio) return;
    // 创建一个极短的静音音频
    unlockAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
    unlockAudio.volume = 0; // 静音
    // 尝试播放，目的是解锁后续的播放权限
    unlockAudio.play().then(() => {
        console.log('音频播放权限已解锁');
        unlockAudio.pause();
    }).catch(e => {
        console.warn('音频解锁失败（可能已解锁）:', e);
    });
}

// ==================== 默认单词库 (500+ 单词) ====================
const DEFAULT_WORDS = {
    // 🐾 动物 (50个)
    animal: [
        { word: 'cat', icon: '🐱', category: 'animal' },
        { word: 'dog', icon: '🐶', category: 'animal' },
        { word: 'bird', icon: '🐦', category: 'animal' },
        { word: 'fish', icon: '🐟', category: 'animal' },
        { word: 'bear', icon: '🐻', category: 'animal' },
        { word: 'lion', icon: '🦁', category: 'animal' },
        { word: 'duck', icon: '🦆', category: 'animal' },
        { word: 'frog', icon: '🐸', category: 'animal' },
        { word: 'pig', icon: '🐷', category: 'animal' },
        { word: 'cow', icon: '🐮', category: 'animal' },
        { word: 'horse', icon: '🐴', category: 'animal' },
        { word: 'sheep', icon: '🐑', category: 'animal' },
        { word: 'goat', icon: '🐐', category: 'animal' },
        { word: 'mouse', icon: '🐭', category: 'animal' },
        { word: 'rabbit', icon: '🐰', category: 'animal' },
        { word: 'tiger', icon: '🐯', category: 'animal' },
        { word: 'panda', icon: '🐼', category: 'animal' },
        { word: 'koala', icon: '🐨', category: 'animal' },
        { word: 'fox', icon: '🦊', category: 'animal' },
        { word: 'wolf', icon: '🐺', category: 'animal' },
        { word: 'deer', icon: '🦌', category: 'animal' },
        { word: 'zebra', icon: '🦓', category: 'animal' },
        { word: 'camel', icon: '🐫', category: 'animal' },
        { word: 'hippo', icon: '🦛', category: 'animal' },
        { word: 'snake', icon: '🐍', category: 'animal' },
        { word: 'turtle', icon: '🐢', category: 'animal' },
        { word: 'whale', icon: '🐋', category: 'animal' },
        { word: 'shark', icon: '🦈', category: 'animal' },
        { word: 'owl', icon: '🦉', category: 'animal' },
        { word: 'eagle', icon: '🦅', category: 'animal' },
        { word: 'swan', icon: '🦢', category: 'animal' },
        { word: 'bee', icon: '🐝', category: 'animal' },
        { word: 'ant', icon: '🐜', category: 'animal' },
        { word: 'snail', icon: '🐌', category: 'animal' },
        { word: 'crab', icon: '🦀', category: 'animal' },
        { word: 'squid', icon: '🦑', category: 'animal' },
        { word: 'bat', icon: '🦇', category: 'animal' },
        { word: 'seal', icon: '🦭', category: 'animal' },
        { word: 'otter', icon: '🦦', category: 'animal' },
        { word: 'llama', icon: '🦙', category: 'animal' },
        { word: 'skunk', icon: '🦨', category: 'animal' },
        { word: 'sloth', icon: '🦥', category: 'animal' },
        { word: 'rhino', icon: '🦏', category: 'animal' },
        { word: 'gorilla', icon: '🦍', category: 'animal' },
        { word: 'monkey', icon: '🐒', category: 'animal' },
        { word: 'chick', icon: '🐤', category: 'animal' },
        { word: 'rooster', icon: '🐓', category: 'animal' },
        { word: 'turkey', icon: '🦃', category: 'animal' },
        { word: 'parrot', icon: '🦜', category: 'animal' },
        { word: 'peacock', icon: '🦚', category: 'animal' }
    ],
    // 🍎 水果蔬菜 (50个)
    fruit: [
        { word: 'apple', icon: '🍎', category: 'fruit' },
        { word: 'banana', icon: '🍌', category: 'fruit' },
        { word: 'grape', icon: '🍇', category: 'fruit' },
        { word: 'orange', icon: '🍊', category: 'fruit' },
        { word: 'peach', icon: '🍑', category: 'fruit' },
        { word: 'pear', icon: '🍐', category: 'fruit' },
        { word: 'lemon', icon: '🍋', category: 'fruit' },
        { word: 'cherry', icon: '🍒', category: 'fruit' },
        { word: 'melon', icon: '🍈', category: 'fruit' },
        { word: 'mango', icon: '🥭', category: 'fruit' },
        { word: 'kiwi', icon: '🥝', category: 'fruit' },
        { word: 'plum', icon: '🫐', category: 'fruit' },
        { word: 'berry', icon: '🍓', category: 'fruit' },
        { word: 'lime', icon: '🍋', category: 'fruit' },
        { word: 'date', icon: '🌴', category: 'fruit' },
        { word: 'fig', icon: '🍇', category: 'fruit' },
        { word: 'guava', icon: '🍈', category: 'fruit' },
        { word: 'papaya', icon: '🥭', category: 'fruit' },
        { word: 'carrot', icon: '🥕', category: 'fruit' },
        { word: 'corn', icon: '🌽', category: 'fruit' },
        { word: 'potato', icon: '🥔', category: 'fruit' },
        { word: 'tomato', icon: '🍅', category: 'fruit' },
        { word: 'onion', icon: '🧅', category: 'fruit' },
        { word: 'garlic', icon: '🧄', category: 'fruit' },
        { word: 'pepper', icon: '🌶️', category: 'fruit' },
        { word: 'bean', icon: '🫘', category: 'fruit' },
        { word: 'pea', icon: '🫛', category: 'fruit' },
        { word: 'olive', icon: '🫒', category: 'fruit' },
        { word: 'nut', icon: '🥜', category: 'fruit' },
        { word: 'seed', icon: '🌱', category: 'fruit' },
        { word: 'ginger', icon: '🫚', category: 'fruit' },
        { word: 'celery', icon: '🥬', category: 'fruit' },
        { word: 'leek', icon: '🧅', category: 'fruit' },
        { word: 'radish', icon: '🥕', category: 'fruit' },
        { word: 'turnip', icon: '🥔', category: 'fruit' },
        { word: 'squash', icon: '🎃', category: 'fruit' },
        { word: 'beet', icon: '🔴', category: 'fruit' },
        { word: 'kale', icon: '🥬', category: 'fruit' },
        { word: 'mint', icon: '🌿', category: 'fruit' },
        { word: 'basil', icon: '🌿', category: 'fruit' },
        { word: 'thyme', icon: '🌿', category: 'fruit' },
        { word: 'sage', icon: '🌿', category: 'fruit' },
        { word: 'dill', icon: '🌿', category: 'fruit' },
        { word: 'chive', icon: '🌿', category: 'fruit' },
        { word: 'sprout', icon: '🌱', category: 'fruit' },
        { word: 'almond', icon: '🥜', category: 'fruit' },
        { word: 'walnut', icon: '🥜', category: 'fruit' },
        { word: 'pecan', icon: '🥜', category: 'fruit' },
        { word: 'cashew', icon: '🥜', category: 'fruit' },
        { word: 'acorn', icon: '🌰', category: 'fruit' }
    ],
    // 🎨 颜色形状 (30个)
    color: [
        { word: 'red', icon: '🔴', category: 'color' },
        { word: 'blue', icon: '🔵', category: 'color' },
        { word: 'green', icon: '🟢', category: 'color' },
        { word: 'yellow', icon: '🟡', category: 'color' },
        { word: 'pink', icon: '🩷', category: 'color' },
        { word: 'orange', icon: '🟠', category: 'color' },
        { word: 'purple', icon: '🟣', category: 'color' },
        { word: 'brown', icon: '🟤', category: 'color' },
        { word: 'white', icon: '⚪', category: 'color' },
        { word: 'black', icon: '⚫', category: 'color' },
        { word: 'gray', icon: '🩶', category: 'color' },
        { word: 'gold', icon: '🌟', category: 'color' },
        { word: 'silver', icon: '🔘', category: 'color' },
        { word: 'tan', icon: '🟫', category: 'color' },
        { word: 'cream', icon: '🍦', category: 'color' },
        { word: 'circle', icon: '⭕', category: 'color' },
        { word: 'square', icon: '🟥', category: 'color' },
        { word: 'heart', icon: '❤️', category: 'color' },
        { word: 'star', icon: '⭐', category: 'color' },
        { word: 'moon', icon: '🌙', category: 'color' },
        { word: 'cube', icon: '🧊', category: 'color' },
        { word: 'oval', icon: '🥚', category: 'color' },
        { word: 'cone', icon: '🔺', category: 'color' },
        { word: 'cross', icon: '✝️', category: 'color' },
        { word: 'arrow', icon: '➡️', category: 'color' },
        { word: 'dot', icon: '🔵', category: 'color' },
        { word: 'line', icon: '➖', category: 'color' },
        { word: 'ring', icon: '💍', category: 'color' },
        { word: 'ball', icon: '🔴', category: 'color' },
        { word: 'diamond', icon: '💎', category: 'color' }
    ],
    // 👋 身体部位 (30个)
    body: [
        { word: 'eye', icon: '👁️', category: 'body' },
        { word: 'nose', icon: '👃', category: 'body' },
        { word: 'ear', icon: '👂', category: 'body' },
        { word: 'hand', icon: '✋', category: 'body' },
        { word: 'foot', icon: '🦶', category: 'body' },
        { word: 'mouth', icon: '👄', category: 'body' },
        { word: 'tooth', icon: '🦷', category: 'body' },
        { word: 'leg', icon: '🦵', category: 'body' },
        { word: 'arm', icon: '💪', category: 'body' },
        { word: 'head', icon: '🗣️', category: 'body' },
        { word: 'face', icon: '😊', category: 'body' },
        { word: 'hair', icon: '💇', category: 'body' },
        { word: 'neck', icon: '🦒', category: 'body' },
        { word: 'back', icon: '🔙', category: 'body' },
        { word: 'chest', icon: '🫁', category: 'body' },
        { word: 'belly', icon: '🤰', category: 'body' },
        { word: 'knee', icon: '🦵', category: 'body' },
        { word: 'elbow', icon: '💪', category: 'body' },
        { word: 'wrist', icon: '⌚', category: 'body' },
        { word: 'ankle', icon: '🦶', category: 'body' },
        { word: 'thumb', icon: '👍', category: 'body' },
        { word: 'finger', icon: '👆', category: 'body' },
        { word: 'toe', icon: '🦶', category: 'body' },
        { word: 'chin', icon: '😬', category: 'body' },
        { word: 'cheek', icon: '😊', category: 'body' },
        { word: 'lip', icon: '👄', category: 'body' },
        { word: 'tongue', icon: '👅', category: 'body' },
        { word: 'brain', icon: '🧠', category: 'body' },
        { word: 'heart', icon: '❤️', category: 'body' },
        { word: 'bone', icon: '🦴', category: 'body' }
    ],
    // 🍔 食物饮料 (50个)
    food: [
        { word: 'bread', icon: '🍞', category: 'food' },
        { word: 'rice', icon: '🍚', category: 'food' },
        { word: 'egg', icon: '🥚', category: 'food' },
        { word: 'milk', icon: '🥛', category: 'food' },
        { word: 'cheese', icon: '🧀', category: 'food' },
        { word: 'butter', icon: '🧈', category: 'food' },
        { word: 'meat', icon: '🥩', category: 'food' },
        { word: 'fish', icon: '🐟', category: 'food' },
        { word: 'chicken', icon: '🍗', category: 'food' },
        { word: 'bacon', icon: '🥓', category: 'food' },
        { word: 'soup', icon: '🍲', category: 'food' },
        { word: 'salad', icon: '🥗', category: 'food' },
        { word: 'pizza', icon: '🍕', category: 'food' },
        { word: 'burger', icon: '🍔', category: 'food' },
        { word: 'hotdog', icon: '🌭', category: 'food' },
        { word: 'taco', icon: '🌮', category: 'food' },
        { word: 'sushi', icon: '🍣', category: 'food' },
        { word: 'noodle', icon: '🍜', category: 'food' },
        { word: 'pasta', icon: '🍝', category: 'food' },
        { word: 'cake', icon: '🎂', category: 'food' },
        { word: 'cookie', icon: '🍪', category: 'food' },
        { word: 'candy', icon: '🍬', category: 'food' },
        { word: 'donut', icon: '🍩', category: 'food' },
        { word: 'pie', icon: '🥧', category: 'food' },
        { word: 'ice', icon: '🧊', category: 'food' },
        { word: 'cream', icon: '🍦', category: 'food' },
        { word: 'honey', icon: '🍯', category: 'food' },
        { word: 'jam', icon: '🍓', category: 'food' },
        { word: 'salt', icon: '🧂', category: 'food' },
        { word: 'sugar', icon: '🍬', category: 'food' },
        { word: 'sauce', icon: '🍅', category: 'food' },
        { word: 'oil', icon: '🫒', category: 'food' },
        { word: 'water', icon: '💧', category: 'food' },
        { word: 'juice', icon: '🧃', category: 'food' },
        { word: 'tea', icon: '🍵', category: 'food' },
        { word: 'coffee', icon: '☕', category: 'food' },
        { word: 'soda', icon: '🥤', category: 'food' },
        { word: 'cocoa', icon: '🍫', category: 'food' },
        { word: 'toast', icon: '🍞', category: 'food' },
        { word: 'waffle', icon: '🧇', category: 'food' },
        { word: 'crepe', icon: '🥞', category: 'food' },
        { word: 'bagel', icon: '🥯', category: 'food' },
        { word: 'muffin', icon: '🧁', category: 'food' },
        { word: 'pretzel', icon: '🥨', category: 'food' },
        { word: 'fries', icon: '🍟', category: 'food' },
        { word: 'chips', icon: '🍟', category: 'food' },
        { word: 'popcorn', icon: '🍿', category: 'food' },
        { word: 'yogurt', icon: '🥛', category: 'food' },
        { word: 'cereal', icon: '🥣', category: 'food' },
        { word: 'oat', icon: '🌾', category: 'food' }
    ],
    // 🚗 交通工具 (30个)
    vehicle: [
        { word: 'car', icon: '🚗', category: 'vehicle' },
        { word: 'bus', icon: '🚌', category: 'vehicle' },
        { word: 'truck', icon: '🚚', category: 'vehicle' },
        { word: 'taxi', icon: '🚕', category: 'vehicle' },
        { word: 'train', icon: '🚆', category: 'vehicle' },
        { word: 'plane', icon: '✈️', category: 'vehicle' },
        { word: 'boat', icon: '⛵', category: 'vehicle' },
        { word: 'ship', icon: '🚢', category: 'vehicle' },
        { word: 'bike', icon: '🚲', category: 'vehicle' },
        { word: 'motor', icon: '🏍️', category: 'vehicle' },
        { word: 'van', icon: '🚐', category: 'vehicle' },
        { word: 'jeep', icon: '🚙', category: 'vehicle' },
        { word: 'tram', icon: '🚊', category: 'vehicle' },
        { word: 'metro', icon: '🚇', category: 'vehicle' },
        { word: 'rocket', icon: '🚀', category: 'vehicle' },
        { word: 'copter', icon: '🚁', category: 'vehicle' },
        { word: 'scooter', icon: '🛴', category: 'vehicle' },
        { word: 'sled', icon: '🛷', category: 'vehicle' },
        { word: 'cart', icon: '🛒', category: 'vehicle' },
        { word: 'canoe', icon: '🛶', category: 'vehicle' },
        { word: 'ferry', icon: '⛴️', category: 'vehicle' },
        { word: 'yacht', icon: '🛥️', category: 'vehicle' },
        { word: 'tractor', icon: '🚜', category: 'vehicle' },
        { word: 'wagon', icon: '🚃', category: 'vehicle' },
        { word: 'cable', icon: '🚡', category: 'vehicle' },
        { word: 'wheel', icon: '🛞', category: 'vehicle' },
        { word: 'tire', icon: '🛞', category: 'vehicle' },
        { word: 'engine', icon: '🔧', category: 'vehicle' },
        { word: 'seat', icon: '💺', category: 'vehicle' },
        { word: 'horn', icon: '📯', category: 'vehicle' }
    ],
    // 🌳 自然植物 (40个)
    nature: [
        { word: 'sun', icon: '☀️', category: 'nature' },
        { word: 'moon', icon: '🌙', category: 'nature' },
        { word: 'star', icon: '⭐', category: 'nature' },
        { word: 'cloud', icon: '☁️', category: 'nature' },
        { word: 'rain', icon: '🌧️', category: 'nature' },
        { word: 'snow', icon: '❄️', category: 'nature' },
        { word: 'wind', icon: '💨', category: 'nature' },
        { word: 'storm', icon: '⛈️', category: 'nature' },
        { word: 'fire', icon: '🔥', category: 'nature' },
        { word: 'water', icon: '💧', category: 'nature' },
        { word: 'tree', icon: '🌳', category: 'nature' },
        { word: 'flower', icon: '🌸', category: 'nature' },
        { word: 'leaf', icon: '🍃', category: 'nature' },
        { word: 'grass', icon: '🌿', category: 'nature' },
        { word: 'plant', icon: '🌱', category: 'nature' },
        { word: 'rose', icon: '🌹', category: 'nature' },
        { word: 'tulip', icon: '🌷', category: 'nature' },
        { word: 'lily', icon: '🪷', category: 'nature' },
        { word: 'daisy', icon: '🌼', category: 'nature' },
        { word: 'cactus', icon: '🌵', category: 'nature' },
        { word: 'palm', icon: '🌴', category: 'nature' },
        { word: 'pine', icon: '🌲', category: 'nature' },
        { word: 'bush', icon: '🌳', category: 'nature' },
        { word: 'rock', icon: '🪨', category: 'nature' },
        { word: 'sand', icon: '🏖️', category: 'nature' },
        { word: 'mud', icon: '🟤', category: 'nature' },
        { word: 'lake', icon: '🏞️', category: 'nature' },
        { word: 'river', icon: '🌊', category: 'nature' },
        { word: 'ocean', icon: '🌊', category: 'nature' },
        { word: 'beach', icon: '🏖️', category: 'nature' },
        { word: 'forest', icon: '🌲', category: 'nature' },
        { word: 'jungle', icon: '🌴', category: 'nature' },
        { word: 'desert', icon: '🏜️', category: 'nature' },
        { word: 'island', icon: '🏝️', category: 'nature' },
        { word: 'hill', icon: '⛰️', category: 'nature' },
        { word: 'valley', icon: '🏞️', category: 'nature' },
        { word: 'cave', icon: '🕳️', category: 'nature' },
        { word: 'cliff', icon: '🧗', category: 'nature' },
        { word: 'pond', icon: '💧', category: 'nature' },
        { word: 'brook', icon: '💧', category: 'nature' }
    ],
    // 👕 衣服鞋帽 (30个)
    clothes: [
        { word: 'shirt', icon: '👕', category: 'clothes' },
        { word: 'pants', icon: '👖', category: 'clothes' },
        { word: 'dress', icon: '👗', category: 'clothes' },
        { word: 'skirt', icon: '👗', category: 'clothes' },
        { word: 'coat', icon: '🧥', category: 'clothes' },
        { word: 'jacket', icon: '🧥', category: 'clothes' },
        { word: 'sweater', icon: '🧶', category: 'clothes' },
        { word: 'vest', icon: '🦺', category: 'clothes' },
        { word: 'sock', icon: '🧦', category: 'clothes' },
        { word: 'shoe', icon: '👟', category: 'clothes' },
        { word: 'boot', icon: '👢', category: 'clothes' },
        { word: 'sandal', icon: '🩴', category: 'clothes' },
        { word: 'slipper', icon: '🥿', category: 'clothes' },
        { word: 'hat', icon: '🎩', category: 'clothes' },
        { word: 'cap', icon: '🧢', category: 'clothes' },
        { word: 'scarf', icon: '🧣', category: 'clothes' },
        { word: 'glove', icon: '🧤', category: 'clothes' },
        { word: 'belt', icon: '👔', category: 'clothes' },
        { word: 'tie', icon: '👔', category: 'clothes' },
        { word: 'shorts', icon: '🩳', category: 'clothes' },
        { word: 'jeans', icon: '👖', category: 'clothes' },
        { word: 'pajama', icon: '🛏️', category: 'clothes' },
        { word: 'robe', icon: '🥋', category: 'clothes' },
        { word: 'bikini', icon: '👙', category: 'clothes' },
        { word: 'suit', icon: '🤵', category: 'clothes' },
        { word: 'gown', icon: '👗', category: 'clothes' },
        { word: 'apron', icon: '👨‍🍳', category: 'clothes' },
        { word: 'mask', icon: '😷', category: 'clothes' },
        { word: 'crown', icon: '👑', category: 'clothes' },
        { word: 'ring', icon: '💍', category: 'clothes' }
    ],
    // 🏠 家具物品 (40个)
    home: [
        { word: 'house', icon: '🏠', category: 'home' },
        { word: 'door', icon: '🚪', category: 'home' },
        { word: 'window', icon: '🪟', category: 'home' },
        { word: 'roof', icon: '🏠', category: 'home' },
        { word: 'wall', icon: '🧱', category: 'home' },
        { word: 'floor', icon: '🟫', category: 'home' },
        { word: 'room', icon: '🛋️', category: 'home' },
        { word: 'bed', icon: '🛏️', category: 'home' },
        { word: 'chair', icon: '🪑', category: 'home' },
        { word: 'table', icon: '🪑', category: 'home' },
        { word: 'desk', icon: '🖥️', category: 'home' },
        { word: 'sofa', icon: '🛋️', category: 'home' },
        { word: 'lamp', icon: '💡', category: 'home' },
        { word: 'clock', icon: '🕐', category: 'home' },
        { word: 'mirror', icon: '🪞', category: 'home' },
        { word: 'shelf', icon: '📚', category: 'home' },
        { word: 'closet', icon: '🚪', category: 'home' },
        { word: 'drawer', icon: '🗄️', category: 'home' },
        { word: 'carpet', icon: '🟫', category: 'home' },
        { word: 'curtain', icon: '🪟', category: 'home' },
        { word: 'pillow', icon: '🛏️', category: 'home' },
        { word: 'blanket', icon: '🛏️', category: 'home' },
        { word: 'towel', icon: '🧻', category: 'home' },
        { word: 'soap', icon: '🧼', category: 'home' },
        { word: 'brush', icon: '🪥', category: 'home' },
        { word: 'comb', icon: '💇', category: 'home' },
        { word: 'bucket', icon: '🪣', category: 'home' },
        { word: 'broom', icon: '🧹', category: 'home' },
        { word: 'mop', icon: '🧽', category: 'home' },
        { word: 'key', icon: '🔑', category: 'home' },
        { word: 'lock', icon: '🔒', category: 'home' },
        { word: 'box', icon: '📦', category: 'home' },
        { word: 'bag', icon: '👜', category: 'home' },
        { word: 'basket', icon: '🧺', category: 'home' },
        { word: 'vase', icon: '🏺', category: 'home' },
        { word: 'pot', icon: '🍲', category: 'home' },
        { word: 'pan', icon: '🍳', category: 'home' },
        { word: 'cup', icon: '☕', category: 'home' },
        { word: 'plate', icon: '🍽️', category: 'home' },
        { word: 'bowl', icon: '🥣', category: 'home' }
    ],
    // 📚 学习用品 (30个)
    school: [
        { word: 'book', icon: '📚', category: 'school' },
        { word: 'pen', icon: '🖊️', category: 'school' },
        { word: 'pencil', icon: '✏️', category: 'school' },
        { word: 'paper', icon: '📄', category: 'school' },
        { word: 'ruler', icon: '📏', category: 'school' },
        { word: 'eraser', icon: '🧹', category: 'school' },
        { word: 'bag', icon: '🎒', category: 'school' },
        { word: 'desk', icon: '🪑', category: 'school' },
        { word: 'chair', icon: '🪑', category: 'school' },
        { word: 'board', icon: '📋', category: 'school' },
        { word: 'chalk', icon: '🖍️', category: 'school' },
        { word: 'marker', icon: '🖍️', category: 'school' },
        { word: 'crayon', icon: '🖍️', category: 'school' },
        { word: 'paint', icon: '🎨', category: 'school' },
        { word: 'brush', icon: '🖌️', category: 'school' },
        { word: 'glue', icon: '🧴', category: 'school' },
        { word: 'tape', icon: '📎', category: 'school' },
        { word: 'clip', icon: '📎', category: 'school' },
        { word: 'folder', icon: '📁', category: 'school' },
        { word: 'note', icon: '📝', category: 'school' },
        { word: 'card', icon: '🗂️', category: 'school' },
        { word: 'map', icon: '🗺️', category: 'school' },
        { word: 'globe', icon: '🌍', category: 'school' },
        { word: 'chart', icon: '📊', category: 'school' },
        { word: 'test', icon: '📝', category: 'school' },
        { word: 'class', icon: '🏫', category: 'school' },
        { word: 'grade', icon: '📈', category: 'school' },
        { word: 'prize', icon: '🏆', category: 'school' },
        { word: 'medal', icon: '🏅', category: 'school' },
        { word: 'badge', icon: '📛', category: 'school' }
    ],
    // ☀️ 天气季节 (20个)
    weather: [
        { word: 'sunny', icon: '☀️', category: 'weather' },
        { word: 'cloudy', icon: '☁️', category: 'weather' },
        { word: 'rainy', icon: '🌧️', category: 'weather' },
        { word: 'snowy', icon: '❄️', category: 'weather' },
        { word: 'windy', icon: '💨', category: 'weather' },
        { word: 'foggy', icon: '🌫️', category: 'weather' },
        { word: 'stormy', icon: '⛈️', category: 'weather' },
        { word: 'hot', icon: '🥵', category: 'weather' },
        { word: 'cold', icon: '🥶', category: 'weather' },
        { word: 'warm', icon: '🌡️', category: 'weather' },
        { word: 'cool', icon: '😎', category: 'weather' },
        { word: 'spring', icon: '🌸', category: 'weather' },
        { word: 'summer', icon: '☀️', category: 'weather' },
        { word: 'autumn', icon: '🍂', category: 'weather' },
        { word: 'winter', icon: '⛄', category: 'weather' },
        { word: 'dry', icon: '🏜️', category: 'weather' },
        { word: 'wet', icon: '💧', category: 'weather' },
        { word: 'icy', icon: '🧊', category: 'weather' },
        { word: 'bright', icon: '🌟', category: 'weather' },
        { word: 'dark', icon: '🌑', category: 'weather' }
    ],
    // 🏃 动作词汇 (40个)
    action: [
        { word: 'run', icon: '🏃', category: 'action' },
        { word: 'walk', icon: '🚶', category: 'action' },
        { word: 'jump', icon: '🦘', category: 'action' },
        { word: 'sit', icon: '🪑', category: 'action' },
        { word: 'stand', icon: '🧍', category: 'action' },
        { word: 'sleep', icon: '😴', category: 'action' },
        { word: 'eat', icon: '🍽️', category: 'action' },
        { word: 'drink', icon: '🥤', category: 'action' },
        { word: 'read', icon: '📖', category: 'action' },
        { word: 'write', icon: '✍️', category: 'action' },
        { word: 'draw', icon: '🎨', category: 'action' },
        { word: 'sing', icon: '🎤', category: 'action' },
        { word: 'dance', icon: '💃', category: 'action' },
        { word: 'play', icon: '🎮', category: 'action' },
        { word: 'swim', icon: '🏊', category: 'action' },
        { word: 'fly', icon: '🦅', category: 'action' },
        { word: 'climb', icon: '🧗', category: 'action' },
        { word: 'throw', icon: '🤾', category: 'action' },
        { word: 'catch', icon: '🤲', category: 'action' },
        { word: 'kick', icon: '⚽', category: 'action' },
        { word: 'push', icon: '👐', category: 'action' },
        { word: 'pull', icon: '🤏', category: 'action' },
        { word: 'open', icon: '📂', category: 'action' },
        { word: 'close', icon: '📁', category: 'action' },
        { word: 'wash', icon: '🧼', category: 'action' },
        { word: 'clean', icon: '🧹', category: 'action' },
        { word: 'cook', icon: '👨‍🍳', category: 'action' },
        { word: 'cut', icon: '✂️', category: 'action' },
        { word: 'mix', icon: '🥣', category: 'action' },
        { word: 'pour', icon: '🫗', category: 'action' },
        { word: 'hug', icon: '🤗', category: 'action' },
        { word: 'kiss', icon: '💋', category: 'action' },
        { word: 'wave', icon: '👋', category: 'action' },
        { word: 'clap', icon: '👏', category: 'action' },
        { word: 'point', icon: '👆', category: 'action' },
        { word: 'smile', icon: '😊', category: 'action' },
        { word: 'cry', icon: '😢', category: 'action' },
        { word: 'laugh', icon: '😂', category: 'action' },
        { word: 'think', icon: '🤔', category: 'action' },
        { word: 'listen', icon: '👂', category: 'action' }
    ],
    // 🔢 数字字母 (36个)
    number: [
        { word: 'one', icon: '1️⃣', category: 'number' },
        { word: 'two', icon: '2️⃣', category: 'number' },
        { word: 'three', icon: '3️⃣', category: 'number' },
        { word: 'four', icon: '4️⃣', category: 'number' },
        { word: 'five', icon: '5️⃣', category: 'number' },
        { word: 'six', icon: '6️⃣', category: 'number' },
        { word: 'seven', icon: '7️⃣', category: 'number' },
        { word: 'eight', icon: '8️⃣', category: 'number' },
        { word: 'nine', icon: '9️⃣', category: 'number' },
        { word: 'ten', icon: '🔟', category: 'number' },
        { word: 'zero', icon: '0️⃣', category: 'number' },
        { word: 'first', icon: '🥇', category: 'number' },
        { word: 'second', icon: '🥈', category: 'number' },
        { word: 'third', icon: '🥉', category: 'number' },
        { word: 'half', icon: '½', category: 'number' },
        { word: 'double', icon: '✌️', category: 'number' },
        { word: 'dozen', icon: '🔢', category: 'number' },
        { word: 'pair', icon: '👯', category: 'number' },
        { word: 'many', icon: '📊', category: 'number' },
        { word: 'few', icon: '📉', category: 'number' },
        { word: 'all', icon: '💯', category: 'number' },
        { word: 'none', icon: '⭕', category: 'number' },
        { word: 'some', icon: '🔢', category: 'number' },
        { word: 'more', icon: '➕', category: 'number' },
        { word: 'less', icon: '➖', category: 'number' },
        { word: 'big', icon: '🐘', category: 'number' },
        { word: 'small', icon: '🐜', category: 'number' },
        { word: 'long', icon: '📏', category: 'number' },
        { word: 'short', icon: '📐', category: 'number' },
        { word: 'tall', icon: '🦒', category: 'number' },
        { word: 'wide', icon: '↔️', category: 'number' },
        { word: 'narrow', icon: '↕️', category: 'number' },
        { word: 'heavy', icon: '🏋️', category: 'number' },
        { word: 'light', icon: '🪶', category: 'number' },
        { word: 'fast', icon: '🚀', category: 'number' },
        { word: 'slow', icon: '🐢', category: 'number' }
    ]
};

// ==================== 认证系统 ====================
// 检查认证状态
async function checkAuth() {
    try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        if (!data.authenticated) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    } catch (error) {
        console.error('认证检查失败:', error);
        window.location.href = '/login.html';
        return false;
    }
}

// 登出功能
async function logout() {
    if (!confirm('确定要登出吗？')) {
        return;
    }
    
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        if (data.success) {
            window.location.href = '/login.html';
        } else {
            alert('登出失败，请重试');
        }
    } catch (error) {
        console.error('登出错误:', error);
        alert('登出失败，请重试');
    }
}

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', async function() {
    // 首先检查认证状态
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        return; // 未认证，已重定向到登录页
    }
    
    loadWordsFromStorage();
    initContentManager();
    // 尝试提前解锁音频播放权限（对部分浏览器有效）
    unlockAudioPlayback();
});

// ==================== 数据存储系统 ====================
function loadWordsFromStorage() {
    const stored = localStorage.getItem('todayWords');
    if (stored) {
        currentWords = JSON.parse(stored);
    } else {
        // 首次使用，加载默认单词
        currentWords = [
            ...DEFAULT_WORDS.animal.slice(0, 3),
            ...DEFAULT_WORDS.fruit.slice(0, 2)
        ];
        saveWordsToStorage();
    }
}

function saveWordsToStorage() {
    localStorage.setItem('todayWords', JSON.stringify(currentWords));
}

function getActiveWords() {
    return currentWords.length > 0 ? currentWords : DEFAULT_WORDS.animal.slice(0, 5);
}

// ==================== 欢迎页 & 音频解锁 ====================
// 语音是否已初始化
let speechReady = false;
let englishVoice = null;

// 初始化语音系统
function initSpeech() {
    if (!('speechSynthesis' in window)) {
        console.log('浏览器不支持语音合成');
        return;
    }
    
    // 获取可用语音列表
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('可用语音数量:', voices.length);
        
        if (voices.length > 0) {
            // 打印所有可用语音（调试用）
            voices.forEach((v, i) => {
                if (v.lang.startsWith('en')) {
                    console.log(`英语语音 ${i}: ${v.name} (${v.lang})`);
                }
            });
            
            // 优先选择英语语音，按优先级排序（选择更清晰、更适合儿童的语音）
            // 优先选择：女性语音（更适合儿童） > Google语音（质量好） > 美式英语
            const enVoices = voices.filter(v => v.lang.startsWith('en'));
            
            englishVoice = 
                // 1. 优先：Google 美式女性语音（最清晰、最适合儿童）
                enVoices.find(v => v.lang === 'en-US' && v.name.includes('Google') && (v.name.includes('Female') || v.name.includes('女') || v.name.includes('Susan') || v.name.includes('Karen'))) ||
                // 2. Google 美式语音（高质量）
                enVoices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
                // 3. Microsoft 美式女性语音
                enVoices.find(v => v.lang === 'en-US' && v.name.includes('Microsoft') && (v.name.includes('Female') || v.name.includes('Zira'))) ||
                // 4. 任何美式英语女性语音
                enVoices.find(v => v.lang === 'en-US' && (v.name.includes('Female') || v.name.includes('女') || v.name.includes('Susan') || v.name.includes('Karen') || v.name.includes('Zira'))) ||
                // 5. Microsoft 美式语音
                enVoices.find(v => v.lang === 'en-US' && v.name.includes('Microsoft')) ||
                // 6. 任何美式英语
                enVoices.find(v => v.lang === 'en-US') ||
                // 7. Google 英式语音
                enVoices.find(v => v.lang === 'en-GB' && v.name.includes('Google')) ||
                // 8. 英式英语
                enVoices.find(v => v.lang === 'en-GB') ||
                // 9. 任何英语
                enVoices[0] ||
                null;
            
            speechReady = true;
            
            if (englishVoice) {
                console.log('已选择英语语音:', englishVoice.name, englishVoice.lang);
            } else {
                console.log('未找到英语语音，将使用浏览器默认语音');
            }
        }
    };
    
    // Chrome 需要监听 voiceschanged 事件
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // 立即尝试加载一次
    loadVoices();
    
    // 延迟再试一次（某些浏览器需要）
    setTimeout(loadVoices, 100);
    setTimeout(loadVoices, 500);
}

// 页面加载时初始化语音
document.addEventListener('DOMContentLoaded', initSpeech);

function startLearning() {
    const btn = document.getElementById('start-btn');
    const tip = document.getElementById('welcome-tip');
    
    // 显示加载状态
    if (btn) {
        btn.innerHTML = '<span class="btn-icon">⏳</span><span>正在启动...</span>';
        btn.disabled = true;
    }
    
    // 关键：在用户交互时立即解锁音频权限
    unlockAudioPlayback();
    
    // 再次尝试初始化语音（用户交互后）
    initSpeech();
    
    // 检查语音支持情况
    const speechSupported = 'speechSynthesis' in window;
    const voices = speechSupported ? window.speechSynthesis.getVoices() : [];
    const hasVoices = voices.length > 0;
    
    // 显示语音状态
    if (tip) {
        if (!speechSupported) {
            tip.innerHTML = '📱 将使用在线语音服务';
            tip.style.color = '#3498db';
        } else if (!hasVoices) {
            tip.innerHTML = '📱 正在加载语音...';
            tip.style.color = '#3498db';
        } else {
            const hasEnglishVoice = voices.some(v => v.lang.startsWith('en'));
            if (!hasEnglishVoice) {
                tip.innerHTML = '⚠️ 未检测到英语语音，将使用在线语音';
                tip.style.color = '#e67e22';
            }
        }
    }
    
    // 播放欢迎语音
    const playWelcome = () => {
        // 尝试使用备用 TTS 播放欢迎语音
        try {
            const audio = new Audio();
            const encodedWord = encodeURIComponent('Hello');
            audio.src = `https://dict.youdao.com/dictvoice?audio=${encodedWord}&type=2`;
            
            audio.onended = () => {
                console.log('欢迎语音播放完成（在线）');
                showView('home-view');
            };
            
            audio.onerror = () => {
                console.log('在线语音加载失败，直接进入');
                showView('home-view');
            };
            
            audio.play().then(() => {
                console.log('在线欢迎语音开始播放');
            }).catch(() => {
                console.log('在线语音播放失败，直接进入');
                showView('home-view');
            });
            
            // 备用：如果2秒后还没切换，强制切换
            setTimeout(() => {
                const welcomeView = document.getElementById('welcome-view');
                if (welcomeView && welcomeView.classList.contains('active')) {
                    showView('home-view');
                }
            }, 2000);
            
        } catch (e) {
            console.log('音频创建失败:', e);
            showView('home-view');
        }
    };
    
    // 如果支持 speechSynthesis 且有语音，使用原生方案
    if (speechSupported && hasVoices) {
        window.speechSynthesis.cancel();
        
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance('Hello');
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            utterance.volume = 1;
            
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
            
            utterance.onstart = () => console.log('欢迎语音开始播放');
            utterance.onend = () => {
                console.log('欢迎语音播放完成');
                speechReady = true;
                showView('home-view');
            };
            utterance.onerror = (e) => {
                console.log('欢迎语音错误:', e.error);
                // 使用备用方案
                playWelcome();
            };
            
            try {
                window.speechSynthesis.speak(utterance);
                console.log('已发送speak命令');
                
                // 备用：如果2秒后还没切换，强制切换
                setTimeout(() => {
                    const welcomeView = document.getElementById('welcome-view');
                    if (welcomeView && welcomeView.classList.contains('active')) {
                        console.log('超时，强制切换页面');
                        showView('home-view');
                    }
                }, 2000);
                
            } catch (e) {
                console.log('speak调用失败:', e);
                playWelcome();
            }
        }, 200);
    } else {
        // 使用在线语音服务
        setTimeout(playWelcome, 200);
    }
}

// ==================== 视图切换 ====================
function showView(viewId) {
    // 隐藏所有视图
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // 显示目标视图
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // 停止语音
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    
    // 根据视图初始化游戏
    switch(viewId) {
        case 'content-manager-view':
            updateWordList();
            updateDefaultWordsGrid('animal');
            break;
        case 'flashcard-game-view':
            initFlashcardGame();
            break;
        case 'word-rain-game-view':
            initWordRainGame();
            break;
        case 'spell-game-view':
            initSpellGame();
            break;
        case 'listen-pick-game-view':
            initListenPickGame();
            break;
        case 'match-game-view':
            initMatchGame();
            break;
        case 'category-game-view':
            initCategoryGame();
            break;
        case 'finder-game-view':
            initFinderGame();
            break;
        case 'tap-game-view':
            initTapGame();
            break;
    }
}

// ==================== 内容管理系统 ====================
function initContentManager() {
    updateWordList();
    updateDefaultWordsGrid('animal');
}

function updateWordList() {
    const wordList = document.getElementById('word-list');
    const wordCount = document.getElementById('word-count');
    const addBtn = document.getElementById('add-word-btn');
    
    if (!wordList) return;
    
    wordList.innerHTML = '';
    wordCount.textContent = currentWords.length;
    
    // 禁用/启用添加按钮
    if (addBtn) {
        addBtn.disabled = currentWords.length >= 10;
    }
    
    currentWords.forEach((item, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
            <div class="word-item-image">${item.image ? `<img src="${item.image}" alt="${item.word}">` : item.icon || '🖼️'}</div>
            <div class="word-item-text">${item.word}</div>
            <div class="word-item-actions">
                <button class="word-item-btn edit-btn" onclick="editWord(${index})">✏️</button>
                <button class="word-item-btn delete-btn" onclick="deleteWord(${index})">✕</button>
            </div>
        `;
        wordItem.addEventListener('click', (e) => {
            if (!e.target.closest('.word-item-btn')) {
                speakWord(item.word);
            }
        });
        wordList.appendChild(wordItem);
    });
    
    if (currentWords.length === 0) {
        wordList.innerHTML = '<p style="color: #999; width: 100%; text-align: center;">还没有添加单词，点击下方按钮添加</p>';
    }
}

function switchDefaultCategory(category) {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    updateDefaultWordsGrid(category);
}

function updateDefaultWordsGrid(category) {
    const grid = document.getElementById('default-words-grid');
    if (!grid) return;
    
    const words = DEFAULT_WORDS[category] || [];
    grid.innerHTML = '';
    
    words.forEach(item => {
        const isAdded = currentWords.some(w => w.word === item.word);
        const wordItem = document.createElement('div');
        wordItem.className = `default-word-item ${isAdded ? 'added' : ''}`;
        wordItem.innerHTML = `
            <div class="default-word-icon">${item.icon}</div>
            <div class="default-word-text">${item.word}</div>
        `;
        if (!isAdded) {
            wordItem.addEventListener('click', () => addDefaultWord(item));
        }
        grid.appendChild(wordItem);
    });
}

function addDefaultWord(item) {
    if (currentWords.length >= 10) {
        showFeedback('❌', '最多只能添加10个单词');
        return;
    }
    
    currentWords.push({ ...item });
    updateWordList();
    updateDefaultWordsGrid(item.category);
    showFeedback('✅', '添加成功！');
    speakWord(item.word);
}

function openAddWordModal() {
    if (currentWords.length >= 10) {
        showFeedback('❌', '最多只能添加10个单词');
        return;
    }
    
    editingWordIndex = -1;
    document.getElementById('modal-title').textContent = '添加新单词';
    document.getElementById('word-input').value = '';
    document.getElementById('preview-image').style.display = 'none';
    document.getElementById('upload-placeholder').style.display = 'flex';
    document.getElementById('preview-image').src = '';
    document.getElementById('category-select').value = '';
    document.getElementById('word-modal').style.display = 'flex';
}

function editWord(index) {
    editingWordIndex = index;
    const word = currentWords[index];
    
    document.getElementById('modal-title').textContent = '编辑单词';
    document.getElementById('word-input').value = word.word;
    document.getElementById('category-select').value = word.category || '';
    
    if (word.image) {
        document.getElementById('preview-image').src = word.image;
        document.getElementById('preview-image').style.display = 'block';
        document.getElementById('upload-placeholder').style.display = 'none';
    } else {
        document.getElementById('preview-image').style.display = 'none';
        document.getElementById('upload-placeholder').style.display = 'flex';
    }
    
    document.getElementById('word-modal').style.display = 'flex';
}

function closeWordModal() {
    document.getElementById('word-modal').style.display = 'none';
    editingWordIndex = -1;
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result;
            document.getElementById('preview-image').style.display = 'block';
            document.getElementById('upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function saveWord() {
    const wordInput = document.getElementById('word-input').value.trim().toLowerCase();
    const previewImage = document.getElementById('preview-image');
    const category = document.getElementById('category-select').value;
    
    if (!wordInput) {
        showFeedback('❌', '请输入单词');
        return;
    }
    
    if (wordInput.length > 10) {
        showFeedback('❌', '单词太长了');
        return;
    }
    
    const wordData = {
        word: wordInput,
        category: category,
        image: previewImage.style.display !== 'none' ? previewImage.src : null,
        icon: getDefaultIcon(category)
    };
    
    if (editingWordIndex >= 0) {
        currentWords[editingWordIndex] = wordData;
    } else {
        currentWords.push(wordData);
    }
    
    closeWordModal();
    updateWordList();
    showFeedback('✅', '保存成功！');
    speakWord(wordInput);
}

function deleteWord(index) {
    const word = currentWords[index];
    currentWords.splice(index, 1);
    updateWordList();
    
    // 更新默认词库显示
    if (word.category) {
        updateDefaultWordsGrid(word.category);
    }
    
    showFeedback('🗑️', '已删除');
}

function getDefaultIcon(category) {
    const icons = {
        animal: '🐾',
        fruit: '🍎',
        color: '🎨',
        body: '👋',
        other: '📝'
    };
    return icons[category] || '📝';
}

function saveTodayWords() {
    saveWordsToStorage();
    showFeedback('💾', '保存成功！游戏已更新');
}

// ==================== 语音系统 ====================
// 当前播放的音频元素
let currentAudio = null;

// 使用备用 TTS 服务播放单词
function speakWordFallback(word) {
    console.log('尝试备用TTS播放:', word);
    
    // 停止之前的音频
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // 播放前尝试解锁权限
    unlockAudioPlayback();
    
    // 使用免费的在线 TTS 服务
    // 方案1: 使用有道词典 TTS（type=1 美式发音，更清晰；type=2 英式发音）
    const encodedWord = encodeURIComponent(word);
    // 优先使用美式发音（type=1），音质更清晰
    const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodedWord}&type=1`;
    
    currentAudio = new Audio(audioUrl);
    currentAudio.playbackRate = 0.75; // 放慢速度，更适合4岁儿童学习
    // 关键：设置音量，避免因静音导致播放失败
    currentAudio.volume = 1.0;
    
    currentAudio.onplay = () => console.log('备用TTS开始播放:', word);
    currentAudio.onended = () => console.log('备用TTS播放完成:', word);
    currentAudio.onerror = (e) => {
        console.error('有道美式TTS播放错误，尝试英式:', e);
        // 如果美式失败，尝试英式（type=2）
        const ukAudioUrl = `https://dict.youdao.com/dictvoice?audio=${encodedWord}&type=2`;
        console.log('尝试有道英式TTS:', ukAudioUrl);
        const backupAudio = new Audio(ukAudioUrl);
        backupAudio.volume = 1.0;
        backupAudio.onerror = (e2) => {
            console.error('有道英式TTS也失败，尝试Google TTS:', e2);
            // 最后尝试 Google TTS
            const googleAudioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodedWord}`;
            const finalBackup = new Audio(googleAudioUrl);
            finalBackup.volume = 1.0;
            finalBackup.play().catch(e3 => {
                console.error('所有TTS服务都失败了:', e3);
                showFeedback('⚠️', '无法播放发音，请检查网络或音量设置。', true);
            });
        };
        backupAudio.play().catch(e2 => {
            console.error('有道英式TTS播放失败:', e2);
        });
    };
    
    // 关键：立即播放，不要等待
    const playPromise = currentAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            console.error('播放被浏览器阻止:', e);
            // 提供一个明确的用户提示
            showFeedback('⚠️', '点击后无法播放？请尝试：1. 检查手机是否静音；2. 刷新页面后先点击"开始学习"，再立即点击"听发音"；3. 换个浏览器试试。', true);
        });
    }
}

// 第二备用方案（Google TTS）
function speakWordFallback2(word) {
    console.log('尝试Google TTS播放:', word);
    
    // 停止之前的音频
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // 播放前尝试解锁权限
    unlockAudioPlayback();
    
    // 使用 Google TTS 服务（更清晰的接口）
    const encodedWord = encodeURIComponent(word);
    // 使用更新的 Google TTS 接口，音质更好
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&q=${encodedWord}`;
    
    currentAudio = new Audio(audioUrl);
    currentAudio.playbackRate = 0.75; // 稍微放慢，更适合儿童
    // 关键：设置音量，避免因静音导致播放失败
    currentAudio.volume = 1.0;
    
    currentAudio.onplay = () => console.log('Google TTS开始播放:', word);
    currentAudio.onended = () => console.log('Google TTS播放完成:', word);
    currentAudio.onerror = (e) => {
        console.error('Google TTS播放错误:', e, 'URL:', audioUrl);
        showFeedback('⚠️', '所有TTS服务都失败了，请检查网络连接。', true);
    };
    
    // 关键：立即播放
    const playPromise = currentAudio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            console.error('Google TTS播放被阻止:', e);
            showFeedback('⚠️', '播放被阻止，请确保在用户点击后立即播放。', true);
        });
    }
}

function speakWord(word) {
    // 检查是否支持 speechSynthesis
    const speechSupported = 'speechSynthesis' in window;
    const hasVoices = speechSupported && window.speechSynthesis.getVoices().length > 0;
    
    // 如果不支持语音合成或没有可用语音，使用备用方案
    if (!speechSupported || !hasVoices || !speechReady) {
        console.log('使用备用TTS服务');
        // 在调用备用方案前解锁权限
        unlockAudioPlayback();
        speakWordFallback(word);
        return;
    }
    
    // 取消当前正在播放的语音
    window.speechSynthesis.cancel();
    
    // 创建语音（针对4岁儿童优化）
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.65; // 更慢的速度，便于儿童理解
    utterance.pitch = 1.15; // 稍微提高音调，更友好
    utterance.volume = 1;
    
    // 使用缓存的英语语音（如果有）
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    
    // 添加事件监听
    utterance.onstart = () => console.log('开始播放:', word);
    utterance.onend = () => console.log('播放完成:', word);
    utterance.onerror = (e) => {
        console.log('播放错误:', e.error, word);
        // 如果出错，使用备用方案
        speakWordFallback(word);
    };
    
    // Chrome 有一个 bug，长时间不说话后语音会卡住
    const speak = () => {
        // 确保取消之前的语音
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
        }
        
        // 延迟执行确保取消生效
        setTimeout(() => {
            try {
                window.speechSynthesis.speak(utterance);
            } catch (e) {
                console.log('speak 调用失败，使用备用方案:', e);
                speakWordFallback(word);
            }
        }, 100);
    };
    
    speak();
}

// 朗读字母
function speakLetter(letter) {
    speakWord(letter);
}

// ==================== 反馈系统 ====================
function showFeedback(icon, text, isError = false) {
    const popup = document.getElementById('feedback-popup');
    const iconEl = document.getElementById('feedback-icon');
    const textEl = document.getElementById('feedback-text');
    
    iconEl.textContent = icon;
    textEl.textContent = text;
    textEl.className = 'feedback-text' + (isError ? ' error' : '');
    
    popup.style.display = 'block';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

function showCompleteModal(message) {
    document.getElementById('complete-message').textContent = message;
    document.getElementById('complete-modal').style.display = 'flex';
}

function closeCompleteModal() {
    document.getElementById('complete-modal').style.display = 'none';
}

function restartCurrentGame() {
    closeCompleteModal();
    
    switch(currentGameType) {
        case 'flashcard': initFlashcardGame(); break;
        case 'wordrain': startWordRain(); break;
        case 'spell': initSpellGame(); break;
        case 'listen': initListenPickGame(); break;
        case 'match': initMatchGame(); break;
        case 'category': initCategoryGame(); break;
        case 'finder': initFinderGame(); break;
        case 'tap': startTapGame(); break;
    }
}

// ==================== 游戏1: 单词闪记卡 ====================
let flashcardIndex = 0;
let isFlipped = false;

function initFlashcardGame() {
    currentGameType = 'flashcard';
    flashcardIndex = 0;
    isFlipped = false;
    
    const words = getActiveWords();
    document.getElementById('total-cards').textContent = words.length;
    updateFlashcard();
}

function updateFlashcard() {
    const words = getActiveWords();
    const word = words[flashcardIndex];
    
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    isFlipped = false;
    
    const imageEl = document.getElementById('flashcard-image');
    const wordEl = document.getElementById('flashcard-word');
    
    if (word.image) {
        imageEl.innerHTML = `<img src="${word.image}" alt="${word.word}">`;
    } else {
        imageEl.textContent = word.icon || '🖼️';
    }
    
    wordEl.textContent = word.word;
    document.getElementById('current-card').textContent = flashcardIndex + 1;
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
    
    if (isFlipped) {
        const words = getActiveWords();
        speakWord(words[flashcardIndex].word);
    }
}

function prevCard() {
    const words = getActiveWords();
    flashcardIndex = (flashcardIndex - 1 + words.length) % words.length;
    updateFlashcard();
}

function nextCard() {
    const words = getActiveWords();
    flashcardIndex = (flashcardIndex + 1) % words.length;
    updateFlashcard();
}

function speakCurrentWord() {
    const words = getActiveWords();
    speakWord(words[flashcardIndex].word);
}

// ==================== 游戏2: 图片单词下雨 ====================
let rainInterval = null;
let rainScore = 0;
let rainActive = false;

function initWordRainGame() {
    currentGameType = 'wordrain';
    rainScore = 0;
    rainActive = false;
    document.getElementById('rain-score').textContent = '0';
    document.getElementById('rain-start-screen').style.display = 'flex';
    
    // 清除已有的下落元素
    document.querySelectorAll('.rain-item').forEach(el => el.remove());
    
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }
}

function startWordRain() {
    document.getElementById('rain-start-screen').style.display = 'none';
    rainActive = true;
    rainScore = 0;
    document.getElementById('rain-score').textContent = '0';
    
    // 开始生成下落元素
    rainInterval = setInterval(createRainItem, 2000);
    createRainItem();
}

function createRainItem() {
    if (!rainActive) return;
    
    const words = getActiveWords();
    const word = words[Math.floor(Math.random() * words.length)];
    const area = document.getElementById('word-rain-area');
    
    const item = document.createElement('div');
    item.className = 'rain-item';
    item.dataset.word = word.word;
    
    const left = Math.random() * (area.offsetWidth - 100);
    item.style.left = left + 'px';
    item.style.top = '-120px';
    
    item.innerHTML = `
        <div class="rain-item-image">${word.image ? `<img src="${word.image}">` : word.icon}</div>
        <div class="rain-item-word">${word.word}</div>
    `;
    
    item.addEventListener('click', () => {
        speakWord(word.word);
        rainScore += 10;
        document.getElementById('rain-score').textContent = rainScore;
        showFeedback('🎉', '太棒了!');
        item.remove();
    });
    
    area.appendChild(item);
    
    // 下落动画
    let top = -120;
    const fallInterval = setInterval(() => {
        if (!rainActive) {
            clearInterval(fallInterval);
            return;
        }
        
        top += 2;
        item.style.top = top + 'px';
        
        if (top > area.offsetHeight) {
            item.remove();
            clearInterval(fallInterval);
        }
    }, 30);
}

function exitWordRain() {
    rainActive = false;
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }
    showView('home-view');
}

// ==================== 游戏3: 字母拼拼乐 ====================
let spellWordIndex = 0;
let spellCurrentWord = '';
let spellFilledLetters = [];

function initSpellGame() {
    currentGameType = 'spell';
    spellWordIndex = 0;
    loadSpellWord();
}

function loadSpellWord() {
    const words = getActiveWords();
    if (spellWordIndex >= words.length) {
        showCompleteModal('你完成了所有拼写挑战！');
        return;
    }
    
    const word = words[spellWordIndex];
    spellCurrentWord = word.word.toUpperCase();
    spellFilledLetters = new Array(spellCurrentWord.length).fill('');
    
    // 显示目标图片
    const imageEl = document.getElementById('spell-target-image');
    if (word.image) {
        imageEl.innerHTML = `<img src="${word.image}">`;
    } else {
        imageEl.textContent = word.icon || '🖼️';
    }
    
    // 创建拼写槽位
    const slotsEl = document.getElementById('spell-slots');
    slotsEl.innerHTML = '';
    for (let i = 0; i < spellCurrentWord.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'spell-slot';
        slot.dataset.index = i;
        slot.addEventListener('click', () => removeLetterFromSlot(i));
        slotsEl.appendChild(slot);
    }
    
    // 创建字母池（包含干扰字母）
    const poolEl = document.getElementById('letter-pool');
    poolEl.innerHTML = '';
    
    const letters = spellCurrentWord.split('');
    // 添加2个干扰字母
    const distractors = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        .filter(l => !letters.includes(l));
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * distractors.length);
        letters.push(distractors.splice(randomIndex, 1)[0]);
    }
    
    // 打乱顺序
    letters.sort(() => Math.random() - 0.5);
    
    letters.forEach((letter, i) => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.dataset.index = i;
        btn.addEventListener('click', () => selectLetter(btn, letter));
        poolEl.appendChild(btn);
    });
    
    document.getElementById('spell-feedback').textContent = '';
    document.getElementById('spell-next-btn').style.display = 'none';
}

function selectLetter(btn, letter) {
    if (btn.classList.contains('used')) return;
    
    // 找到第一个空槽位
    const emptyIndex = spellFilledLetters.findIndex(l => l === '');
    if (emptyIndex === -1) return;
    
    spellFilledLetters[emptyIndex] = { letter, btnIndex: btn.dataset.index };
    btn.classList.add('used');
    
    const slots = document.querySelectorAll('.spell-slot');
    slots[emptyIndex].textContent = letter;
    slots[emptyIndex].classList.add('filled');
    
    // 检查是否完成
    if (!spellFilledLetters.includes('')) {
        checkSpelling();
    }
}

function removeLetterFromSlot(index) {
    const filled = spellFilledLetters[index];
    if (!filled) return;
    
    // 恢复字母按钮
    const btns = document.querySelectorAll('.letter-btn');
    btns[filled.btnIndex].classList.remove('used');
    
    // 清空槽位
    spellFilledLetters[index] = '';
    const slots = document.querySelectorAll('.spell-slot');
    slots[index].textContent = '';
    slots[index].classList.remove('filled', 'wrong');
}

function checkSpelling() {
    const spelled = spellFilledLetters.map(f => f.letter).join('');
    const slots = document.querySelectorAll('.spell-slot');
    
    if (spelled === spellCurrentWord) {
        showFeedback('🎉', '太棒了!');
        speakWord(spellCurrentWord.toLowerCase());
        document.getElementById('spell-feedback').textContent = '✅ 正确！';
        document.getElementById('spell-feedback').style.color = '#7CCD7C';
        document.getElementById('spell-next-btn').style.display = 'block';
        
        // 标记所有槽位为正确
        slots.forEach(slot => slot.classList.add('filled'));
    } else {
        showFeedback('🤔', '再试试吧');
        document.getElementById('spell-feedback').textContent = '❌ 再试试吧';
        document.getElementById('spell-feedback').style.color = '#FF91A4';
        
        // 标记错误位置
        for (let i = 0; i < spellCurrentWord.length; i++) {
            if (spellFilledLetters[i].letter !== spellCurrentWord[i]) {
                slots[i].classList.add('wrong');
            }
        }
    }
}

function nextSpellWord() {
    spellWordIndex++;
    loadSpellWord();
}

function speakSpellWord() {
    speakWord(spellCurrentWord.toLowerCase());
}

function exitSpellGame() {
    showView('home-view');
}

// ==================== 游戏4: 听音选图 ====================
let listenWordIndex = 0;
let listenCurrentWord = null;
let listenAnswered = false;

function initListenPickGame() {
    currentGameType = 'listen';
    listenWordIndex = 0;
    loadListenWord();
}

function loadListenWord() {
    const words = getActiveWords();
    if (listenWordIndex >= words.length) {
        showCompleteModal('你完成了所有听音挑战！');
        return;
    }
    
    listenCurrentWord = words[listenWordIndex];
    listenAnswered = false;
    
    // 获取干扰选项
    const otherWords = words.filter((w, i) => i !== listenWordIndex);
    const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 2);
    const options = [listenCurrentWord, ...shuffled].sort(() => Math.random() - 0.5);
    
    // 渲染选项
    const optionsEl = document.getElementById('listen-options');
    optionsEl.innerHTML = '';
    
    options.forEach(word => {
        const option = document.createElement('div');
        option.className = 'image-option';
        option.dataset.word = word.word;
        option.innerHTML = `
            <div class="option-image">${word.image ? `<img src="${word.image}">` : word.icon}</div>
        `;
        option.addEventListener('click', () => checkListenAnswer(option, word));
        optionsEl.appendChild(option);
    });
    
    document.getElementById('listen-feedback').textContent = '';
    document.getElementById('listen-next-btn').style.display = 'none';
    
    // 自动播放一次
    setTimeout(() => playListenWord(), 500);
}

function playListenWord() {
    if (listenCurrentWord) {
        speakWord(listenCurrentWord.word);
    }
}

function checkListenAnswer(option, selectedWord) {
    if (listenAnswered) return;
    listenAnswered = true;
    
    const isCorrect = selectedWord.word === listenCurrentWord.word;
    
    if (isCorrect) {
        option.classList.add('correct');
        showFeedback('🎉', '太棒了!');
        document.getElementById('listen-feedback').textContent = '✅ 正确！';
        document.getElementById('listen-feedback').style.color = '#7CCD7C';
    } else {
        option.classList.add('wrong');
        // 显示正确答案
        document.querySelectorAll('.image-option').forEach(opt => {
            if (opt.dataset.word === listenCurrentWord.word) {
                opt.classList.add('correct');
            }
        });
        showFeedback('🤔', '再试试吧');
        document.getElementById('listen-feedback').textContent = '❌ 再试试吧';
        document.getElementById('listen-feedback').style.color = '#FF91A4';
    }
    
    document.getElementById('listen-next-btn').style.display = 'block';
}

function nextListenWord() {
    listenWordIndex++;
    loadListenWord();
}

function exitListenPick() {
    showView('home-view');
}

// ==================== 游戏5: 单词连连看 ====================
let matchPairs = [];
let matchSelected = null;
let matchCount = 0;

function initMatchGame() {
    currentGameType = 'match';
    matchSelected = null;
    matchCount = 0;
    
    const words = getActiveWords().slice(0, 5);
    matchPairs = words.map(w => ({ ...w, matched: false }));
    
    document.getElementById('match-count').textContent = '0';
    document.getElementById('match-total').textContent = matchPairs.length;
    document.getElementById('match-feedback').textContent = '';
    
    // 清除连线
    document.getElementById('match-lines').innerHTML = '';
    
    // 渲染图片列
    const imagesCol = document.getElementById('images-column');
    imagesCol.innerHTML = '';
    const shuffledImages = [...matchPairs].sort(() => Math.random() - 0.5);
    
    shuffledImages.forEach(word => {
        const item = document.createElement('div');
        item.className = 'match-item';
        item.dataset.word = word.word;
        item.dataset.type = 'image';
        item.innerHTML = `
            <div class="match-item-image">${word.image ? `<img src="${word.image}">` : word.icon}</div>
        `;
        item.addEventListener('click', () => selectMatchItem(item));
        imagesCol.appendChild(item);
    });
    
    // 渲染单词列
    const wordsCol = document.getElementById('words-column');
    wordsCol.innerHTML = '';
    const shuffledWords = [...matchPairs].sort(() => Math.random() - 0.5);
    
    shuffledWords.forEach(word => {
        const item = document.createElement('div');
        item.className = 'match-item';
        item.dataset.word = word.word;
        item.dataset.type = 'word';
        item.innerHTML = `
            <div class="match-item-word">${word.word}</div>
        `;
        item.addEventListener('click', () => selectMatchItem(item));
        wordsCol.appendChild(item);
    });
}

function selectMatchItem(item) {
    if (item.classList.contains('matched')) return;
    
    if (!matchSelected) {
        matchSelected = item;
        item.classList.add('selected');
    } else if (matchSelected === item) {
        item.classList.remove('selected');
        matchSelected = null;
    } else if (matchSelected.dataset.type === item.dataset.type) {
        matchSelected.classList.remove('selected');
        matchSelected = item;
        item.classList.add('selected');
    } else {
        // 检查配对
        const word1 = matchSelected.dataset.word;
        const word2 = item.dataset.word;
        
        if (word1 === word2) {
            // 匹配成功
            matchSelected.classList.remove('selected');
            matchSelected.classList.add('matched');
            item.classList.add('matched');
            
            // 画连线
            drawMatchLine(matchSelected, item);
            
            speakWord(word1);
            showFeedback('🎉', '配对成功!');
            
            matchCount++;
            document.getElementById('match-count').textContent = matchCount;
            
            if (matchCount === matchPairs.length) {
        setTimeout(() => {
                    showCompleteModal('你完成了所有配对！');
                }, 1000);
            }
        } else {
            // 匹配失败
            showFeedback('🤔', '再试试吧');
            matchSelected.classList.remove('selected');
        }
        
        matchSelected = null;
    }
}

function drawMatchLine(item1, item2) {
    const svg = document.getElementById('match-lines');
    const container = document.getElementById('match-container');
    const containerRect = container.getBoundingClientRect();
    
    const rect1 = item1.getBoundingClientRect();
    const rect2 = item2.getBoundingClientRect();
    
    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
    const y1 = rect1.top + rect1.height / 2 - containerRect.top;
    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
    const y2 = rect2.top + rect2.height / 2 - containerRect.top;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#98FB98');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    
    svg.appendChild(line);
}

function exitMatchGame() {
    showView('home-view');
}

// ==================== 游戏6: 分类小能手 ====================
let categoryItems = [];
let sortedCount = 0;

function initCategoryGame() {
    currentGameType = 'category';
    sortedCount = 0;
    
    const words = getActiveWords();
    
    // 找出有分类的单词
    const categorizedWords = words.filter(w => w.category);
    const categories = [...new Set(categorizedWords.map(w => w.category))];
    
    // 至少需要2个分类
    if (categories.length < 2) {
        document.getElementById('category-feedback').textContent = '请添加不同分类的单词来玩这个游戏';
        return;
    }
    
    // 使用前2个分类
    const useCategories = categories.slice(0, 2);
    categoryItems = categorizedWords.filter(w => useCategories.includes(w.category));
    
    // 渲染分类框
    const boxesEl = document.getElementById('category-boxes');
    boxesEl.innerHTML = '';
    
    const categoryNames = {
        animal: '🐾 动物',
        fruit: '🍎 水果',
        color: '🎨 颜色',
        body: '👋 身体',
        other: '📝 其他'
    };
    
    useCategories.forEach(cat => {
        const box = document.createElement('div');
        box.className = 'category-box';
        box.dataset.category = cat;
        box.innerHTML = `
            <div class="category-label">${categoryNames[cat] || cat}</div>
            <div class="category-items"></div>
        `;
        
        // 拖放事件
        box.addEventListener('dragover', e => {
            e.preventDefault();
            box.classList.add('drag-over');
        });
        box.addEventListener('dragleave', () => {
            box.classList.remove('drag-over');
        });
        box.addEventListener('drop', e => {
            e.preventDefault();
            box.classList.remove('drag-over');
            handleCategoryDrop(box, e.dataTransfer.getData('text/plain'));
        });
        
        boxesEl.appendChild(box);
    });
    
    // 渲染待分类物品
    const itemsEl = document.getElementById('items-to-sort');
    itemsEl.innerHTML = '';
    
    const shuffledItems = [...categoryItems].sort(() => Math.random() - 0.5);
    shuffledItems.forEach((word, i) => {
        const item = document.createElement('div');
        item.className = 'sort-item';
        item.draggable = true;
        item.dataset.word = word.word;
        item.dataset.category = word.category;
        item.innerHTML = `
            <div class="sort-item-image">${word.image ? `<img src="${word.image}">` : word.icon}</div>
            <div class="sort-item-word">${word.word}</div>
        `;
        
        item.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ word: word.word, category: word.category, index: i }));
            item.style.opacity = '0.5';
        });
        item.addEventListener('dragend', () => {
            item.style.opacity = '1';
        });
        
        // 触摸设备支持
        item.addEventListener('click', () => {
            document.querySelectorAll('.sort-item.selected').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
        });
        
        itemsEl.appendChild(item);
    });
    
    // 分类框点击事件（触摸设备）
    document.querySelectorAll('.category-box').forEach(box => {
        box.addEventListener('click', () => {
            const selected = document.querySelector('.sort-item.selected');
            if (selected) {
                handleCategoryDrop(box, JSON.stringify({
                    word: selected.dataset.word,
                    category: selected.dataset.category
                }));
            }
        });
    });
    
    document.getElementById('category-feedback').textContent = '';
}

function handleCategoryDrop(box, dataStr) {
    const data = JSON.parse(dataStr);
    const isCorrect = data.category === box.dataset.category;
    
    if (isCorrect) {
        // 找到并移除原始元素
        const item = document.querySelector(`.sort-item[data-word="${data.word}"]`);
        if (item) {
            // 创建小版本添加到分类框
            const smallItem = document.createElement('div');
            smallItem.className = 'sort-item sorted-item';
            smallItem.innerHTML = item.innerHTML;
            box.querySelector('.category-items').appendChild(smallItem);
            
            item.remove();
            sortedCount++;
            
            speakWord(data.word);
            showFeedback('🎉', '分类正确!');
            
            if (sortedCount === categoryItems.length) {
                setTimeout(() => {
                    showCompleteModal('你完成了所有分类！');
                }, 1000);
            }
            }
        } else {
        showFeedback('🤔', '再试试吧');
    }
}

function exitCategoryGame() {
    showView('home-view');
}

// ==================== 游戏7: 找单词小侦探 ====================
let finderWords = [];
let foundCount = 0;

function initFinderGame() {
    currentGameType = 'finder';
    foundCount = 0;
    
    const words = getActiveWords().slice(0, 5);
    finderWords = words.map(w => ({ ...w, found: false }));
    
    document.getElementById('finder-count').textContent = '0';
    document.getElementById('finder-total').textContent = finderWords.length;
    
    const scene = document.getElementById('finder-scene');
    scene.innerHTML = '';
    
    // 创建背景装饰
    const bg = document.createElement('div');
    bg.className = 'finder-scene-bg';
    const decorations = ['🌳', '🌸', '🏠', '☁️', '🌈', '🦋', '🌻', '⭐', '🍀', '🌺'];
    for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        span.textContent = decorations[Math.floor(Math.random() * decorations.length)];
        bg.appendChild(span);
    }
    scene.appendChild(bg);
    
    // 随机放置单词
    const positions = generateRandomPositions(finderWords.length, scene.offsetWidth - 150, scene.offsetHeight - 60);
    
    finderWords.forEach((word, i) => {
        const wordEl = document.createElement('div');
        wordEl.className = 'hidden-word';
        wordEl.textContent = word.word.toUpperCase();
        wordEl.style.left = positions[i].x + 'px';
        wordEl.style.top = positions[i].y + 'px';
        wordEl.dataset.index = i;
        
        wordEl.addEventListener('click', () => findWord(wordEl, i));
        scene.appendChild(wordEl);
    });
}

function generateRandomPositions(count, maxX, maxY) {
    const positions = [];
    const minDistance = 100;
    
    for (let i = 0; i < count; i++) {
        let attempts = 0;
        let pos;
        
        do {
            pos = {
                x: Math.random() * Math.max(50, maxX - 50) + 20,
                y: Math.random() * Math.max(50, maxY - 50) + 20
            };
            attempts++;
        } while (
            attempts < 50 &&
            positions.some(p => Math.abs(p.x - pos.x) < minDistance && Math.abs(p.y - pos.y) < minDistance)
        );
        
        positions.push(pos);
    }
    
    return positions;
}

function findWord(element, index) {
    if (finderWords[index].found) return;
    
    finderWords[index].found = true;
    element.classList.add('found');
    
    speakWord(finderWords[index].word);
    showFeedback('🎉', '找到了!');
    
    foundCount++;
    document.getElementById('finder-count').textContent = foundCount;
    
    if (foundCount === finderWords.length) {
            setTimeout(() => {
            showCompleteModal('你找到了所有单词！');
        }, 1000);
    }
}

function exitFinderGame() {
    showView('home-view');
}

// ==================== 游戏8: 单词拍拍乐 ====================
let tapScore = 0;
let tapActive = false;
let tapCurrentWord = null;
let tapTimeout = null;

function initTapGame() {
    currentGameType = 'tap';
    tapScore = 0;
    tapActive = false;
    document.getElementById('tap-score').textContent = '0';
    document.getElementById('tap-start-screen').style.display = 'flex';
    document.getElementById('tap-items').style.display = 'none';
    
    if (tapTimeout) {
        clearTimeout(tapTimeout);
        tapTimeout = null;
    }
}

function startTapGame() {
    document.getElementById('tap-start-screen').style.display = 'none';
    document.getElementById('tap-items').style.display = 'grid';
    tapActive = true;
    tapScore = 0;
    document.getElementById('tap-score').textContent = '0';
    
    loadTapRound();
}

function loadTapRound() {
    if (!tapActive) return;
    
    const words = getActiveWords();
    tapCurrentWord = words[Math.floor(Math.random() * words.length)];
    
    // 获取干扰项
    const otherWords = words.filter(w => w.word !== tapCurrentWord.word);
    const shuffled = otherWords.sort(() => Math.random() - 0.5);
    const options = [tapCurrentWord, ...shuffled.slice(0, 5)].sort(() => Math.random() - 0.5);
    
    // 渲染选项
    const itemsEl = document.getElementById('tap-items');
    itemsEl.innerHTML = '';
    
    options.forEach(word => {
        const item = document.createElement('div');
        item.className = 'tap-item';
        item.dataset.word = word.word;
        item.innerHTML = `
            <div class="tap-item-image">${word.image ? `<img src="${word.image}">` : word.icon}</div>
            <div class="tap-item-word">${word.word}</div>
        `;
        item.addEventListener('click', () => checkTapAnswer(item, word));
        itemsEl.appendChild(item);
    });
    
    // 播放目标单词
    setTimeout(() => {
        if (tapActive) {
            speakWord(tapCurrentWord.word);
        }
    }, 500);
}

function checkTapAnswer(item, selectedWord) {
    if (!tapActive) return;
    
    const isCorrect = selectedWord.word === tapCurrentWord.word;
    
    if (isCorrect) {
        item.classList.add('correct');
        tapScore += 10;
        document.getElementById('tap-score').textContent = tapScore;
        showFeedback('🎉', '+10分!');
    } else {
        item.classList.add('wrong');
        showFeedback('🤔', '再试试吧');
        
        // 显示正确答案
        document.querySelectorAll('.tap-item').forEach(el => {
            if (el.dataset.word === tapCurrentWord.word) {
                el.classList.add('correct');
            }
        });
    }
    
    // 下一轮
    tapTimeout = setTimeout(() => {
        if (tapActive && tapScore < 100) {
            loadTapRound();
        } else if (tapScore >= 100) {
            showCompleteModal('太厉害了！你得了100分！');
            tapActive = false;
        }
    }, 1500);
}

function exitTapGame() {
    tapActive = false;
    if (tapTimeout) {
        clearTimeout(tapTimeout);
        tapTimeout = null;
    }
    showView('home-view');
}

// 页面加载完成后尝试解锁音频权限（额外保障）
window.addEventListener('load', unlockAudioPlayback);
