<template>
  <div class="result-list">
    <a-list
            :data-source="data"
            item-layout="vertical"
    >
      <div slot="header">
        <b>搜索结果</b>
      </div>
      <a-list-item
              slot="renderItem"
              slot-scope="item, index"
      >
        <a slot="actions">
          <a-icon type="file-text"/>
          详情
        </a>
        <a slot="actions">
          <a-icon type="eye"/>
          查看
        </a>
        <a-list-item-meta :description="item.author">
          <span slot="title">
            {{ item.title }}
          </span>
        </a-list-item-meta>
        <div class="item-description">
          {{ item.description }}
        </div>
        <div class="item-tags">
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.datetime"
          >
            <a-icon type="clock-circle" />
            {{ item.datetime }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.size"
          >
            <a-icon type="inbox" />
            {{ item.size }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.view"
          >
            <a-icon type="eye" />
            {{ item.view }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.number"
          >
            <a-icon type="file" />
            {{ item.number }}
          </a-tag>
          <a-tag
                  effect="plain"
                  size="small"
                  type="info"
                  v-if="item.location"
          >
            <a-icon type="environment" />
            {{ item.location }}
          </a-tag>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  export default {
    name: 'ResultList',
    data() {
      return {
        data: [{
          'link': 'http://btbtdy1.com/vidlist/11820.html',
          'score': '9.1',
          'title': '少女与战车 剧场版',
          'datetime': '2015',
          'location': '日本',
          'description': '简介：因为讨厌战车道，才转学到没有战车道的大冼女子学园的西住美穗，没想到才刚刚转学过来就被学生会长叫了过去，会长要求美穗选择战车道的修行并且还要在全国大会中出场。而且，队伍中聚集的成员全部都是超个性派——花道本家的大小姐五十铃华、热衷于恋爱的武部沙织、对战车无比狂热的秋山优花里、早上起不来的优等生冷泉麻子，而美穗希望能与朋友们一起快乐地度过高中生活...',
          'author': '主演：渊上舞,茅野爱衣,尾崎真实,中上育实,井口裕香,濑户麻沙美,能登麻美子,井泽诗织,上坂堇,早见沙织,大地叶,仓田雅世,..'
        }, {
          'link': 'http://btbtdy1.com/vidlist/27164.html',
          'score': '0.0',
          'title': '麻辣女配',
          'datetime': '2020',
          'location': '大陆',
          'description': '简介：非典型恶毒女配为博上位，“献身”表里不一恶趣味影帝。 看“妖艳贱货”如何勇斗绿茶婊白莲花，事业爱情一把抓！',
          'author': '主演：乔诗语,阿杰,郭浩然'
        }, {
          'link': 'http://btbtdy1.com/vidlist/27729.html',
          'score': '7.0',
          'title': '侧颜',
          'datetime': '2019',
          'location': '日本',
          'description': '简介：深受身边人信赖的护士市子，在大石家为老人大石塔子提供临终看护服务时，无端卷入大石家女儿沙纪的失踪事件。在扭曲的真相与意外的背叛下，市子的幸福世界瞬间崩塌，顿失工作与婚姻。为了报复，市子化身Lisa，并刻意接近发型师和道，究竟在市子的心底隐藏了怎样的复仇计划？',
          'author': '主演：筒井真理子,市川实日子,池松壮亮,須藤蓮,小川未祐 ,吹越满'
        }, {
          'link': 'http://btbtdy1.com/vidlist/27491.html',
          'score': '7.8',
          'title': '无手的少女',
          'datetime': '2016',
          'location': '法国',
          'description': '简介：在生活窘困之时，一位磨坊主将女儿卖给了魔鬼。受到纯洁之心的保护，女孩从恶魔手中逃出，却被剥夺走了一双手。',
          'author': '主演：阿娜伊斯·德穆斯蒂埃,杰瑞米·埃尔卡伊姆,菲利普·劳登巴赫,奥利维尔·博彻,弗朗索瓦兹·勒布伦,萨沙·布铎,埃琳娜·勒..'
        }, {
          'link': 'http://btbtdy1.com/vidlist/23580.html',
          'score': '6.2',
          'title': '红辣椒1968',
          'datetime': '1968',
          'location': '香港',
          'description': '简介：大导演严峻找来武打影后郑佩佩当女主角，其侠女形象鲜明并且有大丈夫气概，群贼垂诞梅家庄藏金，但屡劫不获，梅逢春为救村灭贼，潜入敌营，红辣椒（郑佩佩）为寨主千金，遇梅后生好感，梅凭红协助，将机密绘成地图带走，惜梅身份破露幸官兵赶到。。。。',
          'author': '主演：郑雷,郑佩佩,李丽丽,樊梅生,谷峰,唐迪'
        }, {
          'link': 'http://btbtdy1.com/vidlist/27388.html',
          'score': '0.0',
          'title': '我的傲娇女友',
          'datetime': '2019',
          'location': '韩国',
          'description': '简介：该片是讲述了一名"零耐心、直进球"的射箭选手和一名"零社会性"的母胎单身工学院学生之间的愉快甜蜜的爱情喜剧。',
          'author': '主演：李伊利雅,池一株,许正民,金基斗,李真伊'
        }, {
          'link': 'http://btbtdy1.com/vidlist/27323.html',
          'score': '0.0',
          'title': '伊帕內瑪姑娘第二季',
          'datetime': '2005',
          'location': '美国',
          'description': '简介：两个男人都爱上了海滩女模特的喜剧爱情故事',
          'author': '主演：暂无'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26896.html',
          'score': '6.6',
          'title': '凯茜，顺从的女孩',
          'datetime': '1973',
          'location': '法国',
          'description': '简介：Cathy is a former prostitute who has come to a little village in Provence. She falls in love with a young farmer, Simon. Her former pimp, Tony, finds her and forces her to work again for him. Cathy tells the truth to Si..',
          'author': '主演：Erika Cool,Gabriel Pontello,Alban Ceray,Brigitte Lahaie'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26878.html',
          'score': '0.0',
          'title': '美国女孩2：发情',
          'datetime': '1984',
          'location': '美国',
          'description': '简介：',
          'author': '主演：夏娜·格兰特,黛比·戴蒙德,劳瑞·史密斯,罗恩·杰里米,Rose Kimball,布莱克·帕尔默,Ken Starbu..'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26759.html',
          'score': '0.0',
          'title': '大胸隔壁女孩',
          'datetime': '2020',
          'location': '韩国',
          'description': '简介：得灿和哲洙两个好基友原本住在一起，直到搬来了一个叫美英的女人，美英平时性格非常冷漠，但在床上却比任何女人都热情十足',
          'author': '主演：신연호/새봄/시우/연주'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26723.html',
          'score': '0.0',
          'title': '淘气女学生',
          'datetime': '1977',
          'location': '美国',
          'description': '简介：',
          'author': '主演：瑞贝卡·布鲁克,Sandra Gartner,Judy Rauch'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26625.html',
          'score': '0.0',
          'title': '比基尼女郎1952',
          'datetime': '1952',
          'location': '法国',
          'description': '简介：在这部愚蠢的喜剧中，漂亮女孩玛丽娜和负责看管灯塔的父亲同住在海边。一天，玛丽娜遇上两个在岸边搜寻宝藏的小伙子，并对其中一个迷恋不已。很快两人间萌发出爱意……本片是碧姬·芭铎最早的出演主角的影片，拍摄于1952年，本片除了在法国外，很少在其它国家上映，直到5年后《上帝创造女人》将碧姬·芭铎捧成了国际明星后才得以在英美等地上映。',
          'author': '主演：碧姬·芭铎,Jean-François Calvé,霍华德·沃侬,埃斯帕妮塔·科尔特斯,雷蒙·科尔迪,波莱特·安德里厄..'
        }, {
          'link': 'http://btbtdy1.com/vidlist/24928.html',
          'score': '0.0',
          'title': '少女的世界',
          'datetime': '2020',
          'location': '韩国',
          'description': '简介：以同名网络漫画为原作，讲述了娜丽、柔娜、美来、仙智的友情和成长的网络电视剧。讲述了朋友们是自己的全世界17岁可爱故事。',
          'author': '主演：崔乂园,黄宝凛星,金镀我,韩彩京,厉云,权玄彬,金敏娥'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26536.html',
          'score': '4.7',
          'title': '热线女孩',
          'datetime': '2016',
          'location': '韩国',
          'description': '简介：任职医美诊所的护士允洙有个不为人知的兼差工作，夜晚的她是个用妩媚嗓音让男人销魂蚀骨的情色电话员。而允洙与老板俊昊之间，更有段超越雇佣关系的激情，但她却从未对俊昊完全地坦诚自我。同诊所的男护士尹锡默默爱慕着允洙，越爱越深无法自拔，更对老板俊昊百般嫉妒。某日，允洙接到了一通诡异来电，她才发现有人早已垂涎她娇媚性感的肉体已久，并无时无刻监看着自己的一举一动……',
          'author': '主演：姜恩惠'
        }, {
          'link': 'http://btbtdy1.com/vidlist/3188.html',
          'score': '5.3',
          'title': '人形少女',
          'datetime': '2013',
          'location': '日本',
          'description': '简介：健太郎是一个孤独的年轻人，有一天被公司解雇的他独自去喝闷酒，却不小心招惹上小混混。他在躲避的过程中误入了一个废墟，看见了一个穿着水手服的人偶少女，突然，少女睁开眼睛并且解救了他。之后，健太郎把少女带回家并开始了奇妙的同居生活。人气写真模特佐佐木心音在片中饰演人偶少女，并将全裸出镜。',
          'author': '主演：佐佐木心音,柄本佑,竹中直人,樱木梨奈,伊藤洋三郎'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26496.html',
          'score': '5.0',
          'title': '撒旦玩偶',
          'datetime': '1982',
          'location': '意大利',
          'description': '简介：一个被诅咒的城堡，引发一连串的杀人命案，是情杀还是仇杀？这其中，究竟隐藏了什么不可告人的秘密？',
          'author': '主演：Jacqueline Dupré,Mariangela Giordano,Aldo Sambrell,Joe Dave..'
        }, {
          'link': 'http://btbtdy1.com/vidlist/14295.html',
          'score': '6.5',
          'title': '工作女郎',
          'datetime': '2015',
          'location': '韩国',
          'description': '简介：《工作女郎》由赵茹珍、Clara主演，是一部喜剧片，《上班女郎》是《我妻子的一切》制作团队的最新作品，讲述的是上班族女性们的浪漫爱情故事。该片由导演郑范识执导，在《上班女郎》中赵茹珍饰演的女白领宝姬被公司解雇之后，入股由Clara饰演的兰熙所开的成人用品商店，两人开始一起工作。公开的角色海报分别以天蓝色和粉红色为背景，也预示着两个人的性格截然不同。赵茹珍身穿白衬衣紧身裙，带着黑框眼镜，展现性感知性的一面。而Clara则长发动人，穿黑网..',
          'author': '主演：赵汝贞,李成敏,金太祐,金宝妍,罗美兰,金基天,赵在允,高庚杓'
        }, {
          'link': 'http://btbtdy1.com/vidlist/5088.html',
          'score': '4.8',
          'title': '日历女孩2016',
          'datetime': '2016',
          'location': '韩国',
          'description': '简介：郑大世哞（民赫）是日历模型娜英幸福（韩佳人Yeong）有微笑的他虽然他们不能在一起。有一天，他的梦中女孩的动作旁边的钟武的枯燥的生活变成了兴奋的门。钟武学她如何遭受背后的空想，他把他所拥有的一切就行，安慰她。娜英是被他的天真和她的工作之间。同时，钟武的朋友勇进（Kwon Yeong Ho）和他可爱的女友姬熙一热夜梦（李熙II）但他每次尝试他站在死亡的边缘，最后在吉熙承认一些东西给他…',
          'author': '主演：한가영,민혁,이소희,주연서,권영호'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26420.html',
          'score': '7.5',
          'title': '手提箱女郎',
          'datetime': '1961',
          'location': '意大利',
          'description': '简介：卡迪那（克劳迪娅·卡汀娜 Claudia Cardinale 饰）是一名风尘歌女，感情之路非常不顺利的她遭到了情人马切洛（罗慕洛·瓦利 Romolo Valli 饰）的始乱终弃。实际上，马切洛的弟弟佩兰（雅克·贝汉 Jacques Perrin 饰）一直默默的爱慕着卡迪那，在卡迪那陷入了被抛弃的绝望后，佩兰向她保证自己会好好对她，以弥补哥哥所造成的的伤害。 起初，卡迪那并不相信佩兰所言，但渐渐的，佩兰的真诚和锲而不舍打动了卡迪那，两人..',
          'author': '主演：克劳迪娅·卡汀娜,雅克·贝汉,卢恰娜·安焦利洛,雷纳托·巴尔迪尼,里卡尔多·加罗内,科拉多·帕尼,吉安·马里亚·沃隆特..'
        }, {
          'link': 'http://btbtdy1.com/vidlist/26284.html',
          'score': '6.3',
          'title': '活死人少女',
          'datetime': '1982',
          'location': '法国',
          'description': '简介：女主角是殭屍中的异类，从死里复活，却陷入永远的迷茫，年少时的女伙伴来相会，人鬼殊途，却延续了早已截断的情感，最後，悲剧以她对伙伴的一噬走进高潮。',
          'author': '主演：Marina Pierro,Françoise Blanchard,Mike Marshall,Carina Baro..'
        }],
      }
    }
  }
</script>

<style
        lang="stylus"
        scoped
>
  .result-list
    height 100%
    padding 5px

    .ant-list
      height 100%

      .item-tags
        margin-top 10px
</style>
