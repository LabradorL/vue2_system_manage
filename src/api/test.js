/*
 * @Author: lixiaofeng
 * @Date: 2022-11-10 17:58:58
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-03-30 15:08:06
 * @Description: 测试获取各种数据
 */
// import request from '@/utils/request'
// 登录方法
// export function realReq(username, password, code) {
//   return request({
//     url: '/auth/login',
//     headers: {
//       isToken: false
//     },
//     method: 'post',
//     data: { username, password, code, uuid }
//   })
// }

// 获取列表数据
export function getTableList(params) {
  return new Promise((resolve, reject) => {
    const arr = [
      {
        id: '00b9dde3e0e4e0438520353892cd301d',
        time: '2022-11-10 17:24:01',
        longText: '明月几时有，把酒问青天，不知天上宫阙，今夕是何年？',
        status: '0',
        shortText: '水调歌头',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 4
      },
      {
        id: '73078856936e1be49502510f71afa4e2',
        time: '2022-11-10 17:24:01',
        longText:
          '我欲乘风归去，又恐琼楼玉宇。高处不胜寒，起舞弄清影，何似在人间。',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        status: '1',
        shortText: '水调歌头',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 4
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3011',
        time: '2022-11-10 17:24:01',
        longText: '转朱阁，低绮户，不应有恨，何事长向别时圆',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        status: '2',
        shortText: '水调歌头',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 4
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3012',
        time: '2022-11-10 17:24:01',
        longText:
          '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟年？',
        path: '@/assets/images/login-background.jpg',
        status: '3',
        shortText: '水调歌头',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 4
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3013',
        time: '2022-11-10 17:24:01',
        longText:
          '寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。',
        status: '4',
        path: '@/assets/images/video.mp4',
        shortText: '雨霖铃·寒蝉凄切',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '2',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3014',
        time: '2022-11-10 17:24:01',
        longText: '明月几时有，把酒问青天，不知天上宫阙，今夕是何年？',
        status: '0',
        shortText: '水调歌头',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '73078856936e1be49502510f71afa4e5',
        time: '2022-11-10 17:24:01',
        longText:
          '我欲乘风归去，又恐琼楼玉宇。高处不胜寒，起舞弄清影，何似在人间。',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        status: '1',
        shortText: '琵琶行',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3016',
        time: '2022-11-10 17:24:01',
        longText: '转朱阁，低绮户，不应有恨，何事长向别时圆',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        status: '2',
        shortText: '出师表',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3017',
        time: '2022-11-10 17:24:01',
        longText:
          '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟年？',
        path: '@/assets/images/login-background.jpg',
        status: '3',
        shortText: '岳阳楼记',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3018',
        time: '2022-11-10 17:24:01',
        longText:
          '寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。',
        status: '4',
        path: '@/assets/images/video.mp4',
        shortText: '雨霖铃·寒蝉凄切',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3019',
        time: '2022-11-10 17:24:01',
        longText: '明月几时有，把酒问青天，不知天上宫阙，今夕是何年？',
        status: '0',
        shortText: '水调歌头',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '73078856936e1be49502510f71afa410',
        time: '2022-11-10 17:24:01',
        longText:
          '我欲乘风归去，又恐琼楼玉宇。高处不胜寒，起舞弄清影，何似在人间。',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        status: '1',
        shortText: '琵琶行',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3020',
        time: '2022-11-10 17:24:01',
        longText: '转朱阁，低绮户，不应有恨，何事长向别时圆',
        path: '@/assets/images/login-background.jpg,@/assets/images/video.mp4',
        status: '2',
        shortText: '出师表',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3021',
        time: '2022-11-10 17:24:01',
        longText:
          '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟年？',
        path: '@/assets/images/login-background.jpg',
        status: '3',
        shortText: '岳阳楼记',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      },
      {
        id: '00b9dde3e0e4e0438520353892cd3022',
        time: '2022-11-10 17:24:01',
        longText:
          '寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。',
        status: '4',
        path: '@/assets/images/video.mp4',
        shortText: '雨霖铃·寒蝉凄切',
        price: '1300',
        username: '李初九',
        age: '18',
        sex: '1',
        profession: '学生',
        hobby: '唱歌',
        phone: '14356546765',
        dynasty: '背景',
        author: '作者',
        total: 1
      }
    ]
    const result = {
      code: 200,
      msg: '成功',
      // rows: arr.splice(0,5),
      rows: arr,
      total: arr.length
    }
    resolve(result)
  })
}

// 获取对象格式的信息
export function getObjData(params) {
  return new Promise((resolve, reject) => {
    const obj = {
      id: '00b9dde3e0e4e0438520353892cd3013',
      time: '2022-11-10 17:24:01',
      longText:
        '寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。',
      shortText: '水调歌头',
      status: '4',
      username: '蓝色的天空',
      phone: '15278679875',
      companyName: '中国农业银行股份有限公司',
      organCode: '911100001000054748',
      area: '北京,北京市,东城区',
      legal: '谷澍',
      cardType: '居民身份证',
      idCard: '210422197103081917',
      address: '详细的地址',
      startTime: '2022-11-16',
      endTime: '2022-12-31',
      timeArr: ['2022-11-16', '2022-12-31'],
      fileList: []
    }
    const result = {
      code: 200,
      msg: '成功',
      data: obj
    }
    resolve(result)
  })
}

export function writtingList() {
  const arr = [
    {
      title: '氓',
      author: '诗经·国风·卫风〔先秦〕',
      content: [
        '氓之蚩蚩，抱布贸丝。匪来贸丝，来即我谋。送子涉淇，至于顿丘。匪我愆期，子无良媒。将子无怒，秋以为期。',
        '乘彼垝垣，以望复关。不见复关，泣涕涟涟。既见复关，载笑载言。尔卜尔筮，体无咎言。以尔车来，以我贿迁。(尔 一作：尓)',
        '桑之未落，其叶沃若。于嗟鸠兮，无食桑葚！于嗟女兮，无与士耽！士之耽兮，犹可说也。女之耽兮，不可说也。',
        '桑之落矣，其黄而陨。自我徂尔，三岁食贫。淇水汤汤，渐车帷裳。女也不爽，士贰其行。士也罔极，二三其德。',
        '三岁为妇，靡室劳矣。夙兴夜寐，靡有朝矣。言既遂矣，至于暴矣。兄弟不知，咥其笑矣。静言思之，躬自悼矣。',
        '及尔偕老，老使我怨。淇则有岸，隰则有泮。总角之宴，言笑晏晏。信誓旦旦，不思其反。反是不思，亦已焉哉！ '
      ],
      translation: [
        '那个人老实忠厚，怀抱布匹来换丝。其实不是真的来换丝，是找个机会谈婚事。送郎君渡过淇水，一直送到顿丘。并非我要拖延约定的婚期而不肯嫁，是因为你没有找好媒人。请郎君不要生气，秋天到了来迎娶。',
        '登上那倒塌的墙壁，遥向复关凝神望。复关没有见到盼望的人，眼泪簌簌掉下来。情郎即从复关来，又说又笑喜洋洋。你用龟板占卜，用蓍草占卦，卜筮的结果没有不吉利。你用车来迎娶，我带上嫁妆嫁给你。',
        '桑树还没落叶的时候，桑叶像水浸润过一样有光泽。唉那些斑鸠呀，不要贪吃桑葚。哎年轻的姑娘们呀，不要沉溺在与男子的情爱中。男子沉溺在爱情里，还可以脱身。女子沉溺在爱情里，就无法摆脱了。',
        '桑树落叶的时候，它的叶子枯黄，纷纷掉落了。自从嫁到你家，多年来忍受贫苦的生活。淇水波涛滚滚，水花打湿了车上的布幔。我女子没有什么差错，男子行为却前后不一致了。男人的爱情没有定准，他的感情一变再变。',
        '婚后多年守妇道，繁重家务劳动没有不干的。起早睡迟，朝朝如此，不能计算了。你的心愿实现后，渐渐对我施凶暴。兄弟不知道我的遭遇，见面时都讥笑我啊。静下心来细细想，只能独自伤心。',
        '当初曾相约和你一同过到老，偕老之说徒然使我怨恨罢了。淇水滔滔终有岸，沼泽虽宽终有尽头。回想少时多欢乐，谈笑之间露温柔。海誓山盟犹在耳，哪里料到你会违反誓言。莫再回想背盟事，既已终结便罢休！'
      ],
      annotation: [],
      literaryBackground: []
    },
    {
      title: '鱼我所欲也',
      author: '孟子〔先秦〕',
      content:[
        '鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。生亦我所欲，所欲有甚于生者，故不为苟得也；死亦我所恶，所恶有甚于死者，故患有所不辟也。如使人之所欲莫甚于生，则凡可以得生者何不用也？使人之所恶莫甚于死者，则凡可以辟患者何不为也？由是则生而有不用也，由是则可以辟患而有不为也。是故所欲有甚于生者，所恶有甚于死者。非独贤者有是心也，人皆有之，贤者能勿丧耳。',
        '一箪食，一豆羹，得之则生，弗得则死。呼尔而与之，行道之人弗受；蹴尔而与之，乞人不屑也。万钟则不辩礼义而受之，万钟于我何加焉！为宫室之美，妻妾之奉，所识穷乏者得我与？乡为身死而不受，今为宫室之美为之；乡为身死而不受，今为妻妾之奉为之；乡为身死而不受，今为所识穷乏者得我而为之；是亦不可以已乎？此之谓失其本心。'
      ],

      translation:[
        '鱼，是我所想要的；熊掌，也是我所想要的。如果这两种东西不能同时都得到的话，那么我就只好放弃鱼而选取熊掌了。生命，也是我所想要的。道义，也是我所想要的。如果这两种东西不能同时都得到的话，那么我就只好牺牲生命而选取道义了。生命是我所喜爱的，但我所喜爱的还有胜过生命的东西，所以我不做苟且偷生的事；死亡是我所厌恶的，厌恶的有比死亡更厉害的东西，所以有的灾祸我不躲避。如果人们所喜爱的东西没有超过生命的，那么凡是能够用来求得生存的手段,有什么不可以使用呢?如果人们所厌恶的事情没有超过死亡的，那么凡是能够用来逃避灾祸的坏事，有什么不可以做的呢？采用某种手段就能够活命，可是有的人却不肯采用；采用某种办法就能够躲避灾祸，可是有的人也不肯采用。由此可见，他们所喜爱的有比生命更宝贵的东西（那就是“义”）；厌恶的有比死亡更厉害的东西，不仅贤人有这种本性，人人都有，只不过有贤能的人不丧失罢了。',
        '一碗饭，一碗汤，吃了就能活下去，不得到它就会饿死。没有礼貌地吆喝着给他，饥饿的行人也不愿接受；用脚踢给别人吃，乞丐也因轻视而不肯接受。高官厚禄却不辨是否合乎礼义就接受了它。这样，高官厚禄对我有什么好处呢?是为了住宅的华丽，妻妾的侍奉和熟识的穷人感激我吗？从前（有人）为了（道义）（宁愿）死也不愿接受（别人的施舍），却为了住宅的华丽却接受了它；从前（有人）为了（道义）（宁愿）死也不愿接受（别人的施舍），现在（有人）却为了妻妾的侍奉却接受了它；从前（有人）为了（道义）（宁愿）死也不愿接受（别人的施舍），如今（有人）却为了让所认识穷困贫乏的人感激他们的恩德而接受了它。这种（行为）难道不可以停止吗？这就叫做丧失了人所固有的本性。'
      ],
      annotation: [],
      literaryBackground:[]
    },
    {
      title: '生于忧患，死于安乐',
      author: '孟子〔先秦〕',
      content:[
        '舜发于畎亩之中，傅说举于版筑之间，胶鬲举于鱼盐之中，管夷吾举于士，孙叔敖举于海，百里奚举于市。故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。',
        '人恒过，然后能改，困于心，衡于虑，而后作；征于色，发于声，而后喻。入则无法家拂士，出则无敌国外患者，国恒亡，然后知生于忧患而死于安乐也。'
      ],
      translation: [
        '舜从田野耕作之中被起用，傅说从筑墙的劳作之中被起用，胶鬲从贩鱼卖盐中被起用，管夷吾是从狱官手里被释放并加以任用的，孙叔敖从海滨隐居的地方被起用，百里奚被从奴隶集市里赎买回来并被起用。',
        '所以上天要把重任降临在某人的身上，必定要先使他的内心痛苦，使他的筋骨劳累，使他经受饥饿之苦，以致肌肤消瘦，使他身处贫困之中，使他做事不顺，通过那样的途径来使他的心灵受到震撼，使他的性情坚韧起来，增加他所不具备的能力。',
        '人常常犯错，然后才能改正；内心忧困，思想阻塞，然后才能奋起；表现在脸色上，流露在言谈中，才能被人们了解。一个国家，在内如果没有坚守法度的大臣'
      ],
      annotation: [],
      literaryBackground:[
        '此文选自《孟子·告子下》。春秋战国时期，战乱纷争，一个国家要想立于不败之地，要奋发图强，不能安于现状、不思进取。这篇文章就是在这种背景下写的。'
      ]
    },
    {
      title: '曹刿论战',
      author: '左丘明〔先秦〕',
      content:[
        '十年春，齐师伐我。公将战，曹刿请见。其乡人曰：“肉食者谋之，又何间焉？”刿曰：“肉食者鄙，未能远谋。”乃入见。问：“何以战？”公曰：“衣食所安，弗敢专也，必以分人。”对曰：“小惠未遍，民弗从也。”公曰：“牺牲玉帛，弗敢加也，必以信。”对曰：“小信未孚，神弗福也。”公曰：“小大之狱，虽不能察，必以情。”对曰：“忠之属也。可以一战。战则请从。”',
        '公与之乘，战于长勺。公将鼓之。刿曰：“未可。”齐人三鼓。刿曰：“可矣。”齐师败绩。公将驰之。刿曰：“未可。”下视其辙，登轼而望之，曰：“可矣。”遂逐齐师。',
        '既克，公问其故。对曰：“夫战，勇气也。一鼓作气，再而衰，三而竭。彼竭我盈，故克之。夫大国，难测也，惧有伏焉。吾视其辙乱，望其旗靡，故逐之。”'
      ],

      translation: [
        '鲁庄公十年的春天，齐国军队攻打鲁国。鲁庄公将要迎战。曹刿请求鲁庄公接见自己。他的同乡说：“打仗的事当权者自会谋划，你又何必参与呢？”曹刿说：“当权者目光短浅，不能深谋远虑。”于是入朝去见鲁庄公。曹刿问：“您凭借什么作战？”鲁庄公说：“衣食这一类安身的东西，不敢独自享有，一定把它分给别人。”曹刿回答说：“这些小恩惠不能遍及百姓，百姓是不会听从您的。”鲁庄公说：“祭祀神灵的牛、羊、玉帛之类的用品，我(从来)不敢虚报数目，一定按照承诺的去做。”曹刿说：“这只是小信用，未能让神灵信服，神是不会保佑你的。 ”鲁庄公说：“大大小小的案件，虽然不能件件都了解得清楚，但一定要处理得合情合理。”曹刿回答说：“这才是尽了本职一类的事，可以凭借这个条件打一仗。如果作战，请允许我跟随您一同去。”',
        '鲁庄公和他共坐一辆战车，在长勺和齐军作战。鲁庄公将要下令击鼓进军。曹刿说：“现在不行。”等到齐军三次击鼓之后。曹刿说：“可以击鼓进军了。”齐军溃败。鲁庄公又要下令驾车马追逐齐军。曹刿说：“还不行。”说完就向下看，查看齐军车轮碾出的痕迹，又登上战车，扶着轼远望齐军的队形，这才说：“可以追击了。”于是追击齐军。',
        '战胜齐军后，鲁庄公问他这样做的原因。曹刿回答说：“作战，是靠敢作敢为毫不畏惧的气概。第一次击鼓能够振作士气。第二次击鼓士兵们的士气就开始低落了，第三次击鼓士兵们的士气就穷尽了。他们的士气已经消失而我军的士气正盛，所以才战胜了他们。像齐国这样的大国，他们的情况是难以推测的，怕他们设下埋伏。我看他们车轮碾过的痕迹散乱，望见他们的旗子倒下了，所以决定追击他们。”'
      ],
      annotation: [],
      literaryBackground:[
        '本篇选文又题作“齐鲁长勺之战”或“长勺之战”。《曹刿论战》记载了发生在公元前684年，齐借口鲁国曾帮助公子纠争夺齐国君位，再次兴兵攻鲁，两军战于长勺。'
      ]
    },
    {
      title: '邹忌讽齐王纳谏',
      author: '战国策〔先秦〕',
      content: [
        '邹忌修八尺有余，而形貌昳丽。朝服衣冠，窥镜，谓其妻曰：“我孰与城北徐公美？”其妻曰：“君美甚，徐公何能及君也？”城北徐公，齐国之美丽者也。忌不自信，而复问其妾曰：“吾孰与徐公美？”妾曰：“徐公何能及君也？”旦日，客从外来，与坐谈，问之客曰：“吾与徐公孰美？”客曰：“徐公不若君之美也。”明日徐公来，孰视之，自以为不如；窥镜而自视，又弗如远甚。暮寝而思之，曰：“吾妻之美我者，私我也；妾之美我者，畏我也；客之美我者，欲有求于我也。”',
        '于是入朝见威王，曰：“臣诚知不如徐公美。臣之妻私臣，臣之妾畏臣，臣之客欲有求于臣，皆以美于徐公。今齐地方千里，百二十城，宫妇左右莫不私王，朝廷之臣莫不畏王，四境之内莫不有求于王：由此观之，王之蔽甚矣。”',
        '王曰：“善。”乃下令：“群臣吏民能面刺寡人之过者，受上赏；上书谏寡人者，受中赏；能谤讥于市朝，闻寡人之耳者，受下赏。”令初下，群臣进谏，门庭若市；数月之后，时时而间进；期年之后，虽欲言，无可进者。燕、赵、韩、魏闻之，皆朝于齐。此所谓战胜于朝廷。'
      ],
      translation: [
        '邹忌身高八尺多，而且外形、容貌光艳美丽。早晨穿戴好衣帽，照着镜子，对他妻子说：“我和城北徐公相比，谁更美？”他的妻子说：“您非常美，徐公怎么能比得上您？” 城北的徐公是齐国的美男子。邹忌不相信自己比徐公美，于是又问他的妾：“我和徐公相比，谁更美？”妾回答说：“徐公哪能比得上您？”第二天，有客人从外面来拜访，邹忌与他相坐而谈，问客人：“我和徐公比，谁更美？”客人说：“徐公不如您美丽。” 又过了一天，徐公来了，邹忌仔细地看着他，自己认为不如徐公美；再照镜子看着自己，更是觉得自己与徐公相差甚远。晚上他躺在床上休息时想这件事，说：“我的妻子认为我美，是偏爱我；我的妾认为我美，是害怕我；我的客人认为我美，是有事情有求于我。”',
        '于是邹忌上朝拜见齐威王，说：“我知道自己确实比不上徐公美。可是我的妻子偏爱我，我的妾害怕我，我的客人有事想要求助于我，所以他们都认为我比徐公美。如今齐国有方圆千里的疆土，一百二十座城池。宫中的姬妾及身边的近臣，没有一个不偏爱大王的，朝中的大臣没有一个不惧怕大王的，全国的百姓没有不对大王有所求的。由此看来，大王您受到的蒙蔽太严重了！”',
        '齐威王说：“你说的很好！”于是就下了命令：“大小的官吏，大臣和百姓们，能够当面批评我的过错的人，给予上等奖赏；上书直言规劝我的人，给予中等奖赏；能够在众人集聚的公共场所指责议论我的过失，并传到我耳朵里的人，给予下等奖赏。” 命令刚下达，许多大臣都来进献谏言，宫门和庭院像集市一样喧闹；几个月以后，还不时地有人偶尔进谏；满一年以后，即使有人想进谏，也没有什么可说的了。燕、赵、韩、魏等国听说了这件事，都到齐国朝拜齐威王。这就是所说的在朝廷之中不战自胜。'
      ],
      annotation: [
        { word: '邹忌（zōu jì）', meaning: '战国时齐人，善鼓琴，有辩才，曾任齐相。' },
        { word: '讽', meaning: '指下级对上级以委婉曲折的言语进行规劝。' },
        { word: '齐王', meaning: '即齐威王。' },
        { word: '纳谏', meaning: '接受规劝。纳，接受，接纳。' },
        { word: '修', meaning: '长，这里指身高。' },
        { word: '八尺', meaning: '战国时一尺约合今天的七寸左右。' },
        { word: '昳丽', meaning: '光艳美丽。' },
        { word: '修', meaning: '长，这里指身高。' }
      ],
      literaryBackground: [
        '春秋战国之际，七雄并立，各国间的兼并战争，各统治集团内部新旧势力的斗争异常尖锐激烈。在这激烈动荡的时代，士作为一种最活跃的阶层出现在政治舞台上。各国统治者也认识到失去了民心，国家的统治就难以维持。所以，他们争相延揽人才。至于邹忌讽齐王纳谏的故事，于史无考。'
      ]
    },
    {
      title: '出师表',
      author: '',
      content: [],
      translation: [],
      annotation: [],
      literaryBackground: []
    },
    {
      title: '桃花源记',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '三峡',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '杂说（四）',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '陋室铭',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '小石潭记',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '岳阳楼记',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '醉翁亭记',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '爱莲说',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '记承天寺夜游',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '送东阳马生序',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '关雎',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '蒹葭',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '观沧海',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '饮酒【其五】',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '送杜少府之任蜀州',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '次北固山下',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '使至塞上',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '闻王昌龄左迁龙标遥有此寄',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '行路难',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '望岳',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '春望',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '茅屋为秋风所破歌',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '白雪歌诵武判官归京',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '早春呈水部张十八员外',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '酬乐天扬州初逢席上见赠',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '观刈麦',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '钱塘江湖春行',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '雁门太守行',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '赤壁',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '泊秦淮',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '夜雨寄北',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '无题',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '登飞来峰',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '相见欢',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '渔家傲',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '浣溪沙',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '江城子密州出猎',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '水调歌头',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '游山西村',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '破阵子•为陈同甫赋壮词以寄之',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '过零丁洋',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '天净沙•秋思',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '山坡羊潼关怀古',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '己亥杂诗',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '得道多助，失道寡助',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '伯牙善鼓琴',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '答谢中书书',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '湖心亭看雪',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '河中石兽',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '木兰辞',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '登幽州台歌',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '卖炭翁',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '南乡子•登京口北固亭有坏',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '满江红•小住京华',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '劝学',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '逍遥游',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '师说',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '阿房宫赋',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '赤壁赋',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '诗经•卫风•氓',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '离骚',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '蜀道难',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '登高',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '琵琶行',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '锦瑟',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '虞美人',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '念奴娇•赤壁怀古',
      author: '',
      content: '',
      translation: '',
      annotation: []
    },
    {
      title: '永遇乐•京口北固亭怀古',
      author: '',
      content: '',
      translation: '',
      annotation: []
    }
  ]
  return new Promise((resolve, reject) => {
    const result = {
      code: 200,
      msg: '成功',
      rows: arr
    }
    resolve(result)
  })
}

export function getOrg() {
  const arr = []
  return new Promise((resolve, reject) => {
    const result = {
      code: 200,
      msg: '成功',
      rows: arr
    }
    resolve(result)
  })
}
