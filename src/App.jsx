import React, { useState } from 'react';
import { AlertCircle, Check, ChevronRight, Sun, Snowflake, Zap, Droplet } from 'lucide-react';

const ConstitutionDiagnosisApp = () => {
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [userInfo, setUserInfo] = useState({ age: '', gender: '' });

  const questions = [
    {
      id: 'energy',
      question: '普段の体力について最も当てはまるものは?',
      options: [
        { value: 'high', label: '体力があり、活動的に過ごせる', jitsu: 2 },
        { value: 'medium', label: 'まあまあ体力がある', jitsu: 1 },
        { value: 'low', label: '疲れやすく、休息が必要', kyo: 2 },
        { value: 'very_low', label: 'すぐに疲れてしまう', kyo: 3 }
      ]
    },
    {
      id: 'appetite',
      question: '食欲について最も当てはまるものは?',
      options: [
        { value: 'strong', label: '食欲旺盛でしっかり食べられる', jitsu: 2 },
        { value: 'normal', label: '普通の食欲', jitsu: 1 },
        { value: 'weak', label: '食欲があまりない', kyo: 2 },
        { value: 'very_weak', label: 'ほとんど食べられない', kyo: 3 }
      ]
    },
    {
      id: 'cold',
      question: '寒さや冷えについて最も当てはまるものは?',
      options: [
        { value: 'not_cold', label: '冷えを感じることはほとんどない', netsu: 1 },
        { value: 'sometimes', label: 'たまに冷えを感じる', kan: 1 },
        { value: 'often', label: 'よく手足が冷える', kan: 2 },
        { value: 'always', label: '常に体が冷えている', kan: 3 }
      ]
    },
    {
      id: 'heat',
      question: '体の熱感について最も当てはまるものは?',
      options: [
        { value: 'hot', label: 'よく体が火照る、暑がり', netsu: 3 },
        { value: 'sometimes_hot', label: 'たまに体が熱く感じる', netsu: 2 },
        { value: 'normal', label: '特に熱感はない', netsu: 0 },
        { value: 'cold', label: '暑さより寒さを感じやすい', kan: 1 }
      ]
    },
    {
      id: 'inflammation',
      question: '炎症や肌トラブルについて最も当てはまるものは?',
      options: [
        { value: 'often', label: 'ニキビや吹き出物ができやすい', netsu: 2 },
        { value: 'sometimes', label: 'たまに肌トラブルがある', netsu: 1 },
        { value: 'rare', label: 'あまりない', netsu: 0 },
        { value: 'dry', label: '乾燥肌で荒れやすい', kan: 1 }
      ]
    },
    {
      id: 'voice',
      question: '声や話し方について最も当てはまるものは?',
      options: [
        { value: 'loud', label: '声が大きく、元気に話す', jitsu: 2 },
        { value: 'normal', label: '普通の声量', jitsu: 1 },
        { value: 'quiet', label: '声が小さめ', kyo: 1 },
        { value: 'weak', label: '声が弱々しい', kyo: 2 }
      ]
    },
    {
      id: 'stool',
      question: 'お通じについて最も当てはまるものは?',
      options: [
        { value: 'constipated', label: '便秘がち', netsu: 1, jitsu: 1 },
        { value: 'normal', label: '正常', netsu: 0 },
        { value: 'loose', label: '下痢しやすい', kan: 1, kyo: 1 },
        { value: 'unstable', label: '便秘と下痢を繰り返す', kyo: 1 }
      ]
    },
    {
      id: 'thirst',
      question: '喉の渇きについて最も当てはまるものは?',
      options: [
        { value: 'very_thirsty', label: 'よく喉が渇き、冷たいものを飲みたい', netsu: 2 },
        { value: 'normal', label: '普通に水分を取る', netsu: 0 },
        { value: 'not_thirsty', label: 'あまり喉が渇かない', kan: 1 },
        { value: 'warm_drinks', label: '温かい飲み物を好む', kan: 2 }
      ]
    }
  ];

  const calculateResults = () => {
    let jitsuScore = 0;
    let kyoScore = 0;
    let netsuScore = 0;
    let kanScore = 0;

    Object.values(answers).forEach(answer => {
      jitsuScore += answer.jitsu || 0;
      kyoScore += answer.kyo || 0;
      netsuScore += answer.netsu || 0;
      kanScore += answer.kan || 0;
    });

    const primaryType = jitsuScore > kyoScore ? 'jitsu' : 'kyo';
    const secondaryType = netsuScore > kanScore ? 'netsu' : 'kan';

    return {
      primary: primaryType,
      secondary: secondaryType,
      type: `${primaryType}_${secondaryType}`,
      scores: { jitsuScore, kyoScore, netsuScore, kanScore }
    };
  };

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    const result = calculateResults();
    setResults(result);
    setStep('results');
  };

  const getAgeGenderAdvice = (age, gender) => {
    const ageNum = parseInt(age);
    const advice = [];

    if (gender === '女性') {
      if (ageNum >= 40 && ageNum < 60) {
        advice.push('更年期に入る時期です。ホルモンバランスの変化に注意し、不調を感じたら早めに相談しましょう。');
      } else if (ageNum >= 60) {
        advice.push('骨密度の低下に注意が必要です。カルシウムとビタミンDを意識的に摂取しましょう。');
      } else {
        advice.push('生理不順や生理痛が続く場合は、体質改善とともに専門医への相談をお勧めします。');
      }
    }

    if (gender === '男性') {
      if (ageNum >= 40) {
        advice.push('生活習慣病のリスクが高まる年齢です。定期的な健康診断を受けましょう。');
      }
    }

    if (ageNum >= 60) {
      advice.push('体力の維持と、慢性疾患の予防・管理が重要です。無理のない範囲で運動習慣を続けましょう。');
    } else if (ageNum >= 40) {
      advice.push('生活習慣の見直しが重要な時期です。今からの養生が将来の健康を左右します。');
    } else {
      advice.push('若いうちからの体質改善と予防が、将来の健康につながります。');
    }

    return advice;
  };

  const constitutionTypes = {
    jitsu_netsu: {
      name: '実証 × 熱証',
      color: 'from-amber-700 to-orange-600',
      description: '体力があり、体に熱がこもりやすいタイプ。エネルギッシュで活動的だが、炎症を起こしやすい傾向があります。',
      icon: <div className="flex gap-2"><Zap size={32} /><Sun size={32} /></div>,
      characteristics: ['体力が旺盛で精力的', '暑がりで汗をかきやすい', '声が大きく、話し方も力強い', '顔色が赤い、血色が良い', '食欲旺盛', '便秘になりやすい', 'イライラしやすい', '肌に炎症が起きやすい'],
      healthRisks: ['便秘', '高血圧', '頭痛', 'ニキビ・吹き出物', '口内炎', '目の充血', '肩こり', '不眠', 'のぼせ', '糖尿病', '脂質異常症', '痛風', '脳卒中', '心筋梗塞', '胃炎', '痔', '肥満'],
      advice: ['食べ過ぎ、飲み過ぎに注意する', '辛いものやアルコールを控える', '十分な水分補給を心がける', '激しい運動より、適度な有酸素運動を', 'ストレス管理を意識する', '早寝早起きの規則正しい生活を', '塩分、脂質の過剰摂取を控える'],
      dietary: {
        good: ['体を冷やす野菜（トマト、きゅうり、レタス、セロリ）', '緑黄色野菜', '海藻類', '豆腐などの大豆製品', '白身魚', 'そば', '果物（適量）', '緑茶（適量）'],
        avoid: ['肉類の過剰摂取', '辛い食べ物', '揚げ物、油っこいもの', 'アルコール', 'カフェインの過剰摂取', '甘いもの（砂糖）の過剰摂取', '加工食品', '食べ過ぎ']
      },
      fourPoisons: ['質の悪い植物性油脂：炎症を悪化させ、血液をドロドロにする', '砂糖：血糖値の急上昇で熱を発生させ、炎症を促進する', '乳製品：体質によっては炎症反応を引き起こす', '小麦：グルテンによる炎症反応が特に問題になりやすい']
    },
    jitsu_kan: {
      name: '実証 × 寒証',
      color: 'from-amber-700 to-blue-600',
      description: '体力はあるものの、冷えやすいタイプ。エネルギーは充実しているが、血行不良や冷えによる不調が出やすい傾向があります。',
      icon: <div className="flex gap-2"><Zap size={32} /><Snowflake size={32} /></div>,
      characteristics: ['体力はあるが冷え性', '筋肉質だが手足が冷たい', '食欲はあるが冷たいものは苦手', '声は大きいが温かい飲み物を好む', '便秘と冷えが同時にある', '肩こりや腰痛がある', '生理痛が重い（女性の場合）'],
      healthRisks: ['手足の冷え', '便秘', '肩こり', '腰痛', '生理痛', '頭痛', 'むくみ', '関節痛', '高血圧', '冷え性', '生理不順', '子宮筋腫', '関節炎', '痔', '腰痛症', '肩こり症'],
      advice: ['体を温める食事を心がける', '適度な運動で血行を促進する', '入浴で体を温める（湯船にゆっくり浸かる）', '冷房の効きすぎに注意', 'ストレッチで血流を改善する', '腹巻きや靴下で保温する', '食べ過ぎには注意しながらバランスよく'],
      dietary: {
        good: ['温かい食事', '根菜類（ごぼう、人参、れんこん）', '生姜、ニンニク、ネギ', '味噌、納豆などの発酵食品', '青魚（サバ、イワシ）', '鶏肉（適量）', 'シナモン、山椒などのスパイス', '温かいお茶（ほうじ茶、紅茶）'],
        avoid: ['冷たいもの', '生野菜の過剰摂取', 'アイスや冷たい飲み物', '南国のフルーツの過剰摂取', '白砂糖', '加工食品', '質の悪い油脂', '食べ過ぎ']
      },
      fourPoisons: ['質の悪い植物性油脂：血行を悪化させ、冷えを助長する', '砂糖：一時的に体を温めるが、その後冷えを助長する', '乳製品：体を冷やし、血行不良を招く', '小麦：消化に負担をかけ、冷えの原因になる']
    },
    kyo_netsu: {
      name: '虚証 × 熱証',
      color: 'from-slate-500 to-orange-600',
      description: '体力が乏しく、微熱や炎症を起こしやすいタイプ。疲れやすいのに体に熱がこもり、不快な症状が出やすい傾向があります。',
      icon: <div className="flex gap-2"><Droplet size={32} /><Sun size={32} /></div>,
      characteristics: ['疲れやすいが体が火照る', '手のひらや足の裏が熱い', '口が渇くが水をあまり飲めない', '夕方から夜に微熱が出やすい', '寝汗をかきやすい', '顔が赤いが体力はない', '不眠や浅い眠り', 'イライラしやすい'],
      healthRisks: ['微熱', '寝汗', '手足のほてり', '口の渇き', '不眠', 'めまい', '目の乾燥', '慢性疲労', '喉の渇き', '慢性疲労症候群', '更年期障害', '自律神経失調症', '不眠症', '貧血', '甲状腺機能異常', 'ドライアイ', '口内炎'],
      advice: ['無理をせず、十分な休息を取る', '睡眠時間を確保する（7-8時間）', '体を適度に冷やす食材を摂る', '辛いものやアルコールを避ける', 'ストレスをためない', '激しい運動は避け、ヨガなど穏やかな運動を', '夜更かしを避ける'],
      dietary: {
        good: ['体を冷やす野菜（トマト、きゅうり）', '消化の良い食事', '良質なタンパク質（白身魚、豆腐）', '黒ゴマ、クコの実', '山芋、百合根', '果物（梨、リンゴ）', '緑茶（適量）', '少量ずつ頻繁に食べる'],
        avoid: ['辛い食べ物', '揚げ物', '脂っこいもの', 'アルコール', 'カフェインの過剰摂取', '消化に悪いもの', '一度に大量に食べること', '加工食品']
      },
      fourPoisons: ['質の悪い植物性油脂：炎症を悪化させ、疲労を増大させる', '砂糖：血糖値の乱高下で疲労と熱感を悪化させる', '乳製品：炎症を引き起こし、消化に負担をかける', '小麦：消化に負担がかかり、炎症反応を引き起こす']
    },
    kyo_kan: {
      name: '虚証 × 寒証',
      color: 'from-slate-500 to-blue-600',
      description: '体力が乏しく、冷えやすいタイプ。最も養生が必要なタイプで、温めと栄養補給を重視する必要があります。',
      icon: <div className="flex gap-2"><Droplet size={32} /><Snowflake size={32} /></div>,
      characteristics: ['非常に疲れやすい', '常に体が冷えている', '手足が冷たい', '声が小さく弱々しい', '食欲がない、食が細い', '下痢しやすい', '風邪をひきやすい', '顔色が青白い'],
      healthRisks: ['慢性疲労', '手足の冷え', 'めまい', '息切れ', '下痢', '腹痛', '頻尿', '貧血', '生理不順', 'むくみ', '低血圧', '低体温症', '胃腸障害', '免疫力低下', '慢性疲労症候群', '神経衰弱', '不妊症', '栄養失調'],
      advice: ['無理は絶対に避け、十分な休息を取る', '睡眠時間を確保する（8時間以上）', '体を温めることを最優先にする', '消化の良い温かい食事を心がける', '冷たいものは避ける', '入浴で体を温める（長めの入浴）', '腹巻き、靴下、レッグウォーマーで保温', '軽い散歩から始め、無理な運動は避ける'],
      dietary: {
        good: ['温かい食事（常に温めて食べる）', '消化の良いもの', '根菜類（人参、大根、ごぼう、れんこん）', '生姜、ニンニク、ネギ', '味噌、納豆などの発酵食品', '良質なタンパク質（白身魚、鶏肉、卵）', 'シナモン、山椒などのスパイス', '温かいお茶（ほうじ茶、紅茶、生姜湯）', '少量ずつ頻繁に食べる', 'よく噛んで食べる'],
        avoid: ['冷たいもの（絶対に避ける）', '生もの', '生野菜の過剰摂取', 'アイスや冷たい飲み物', '南国のフルーツ', '消化に悪いもの', '白砂糖', '加工食品', '質の悪い油脂']
      },
      fourPoisons: ['質の悪い植物性油脂：代謝を低下させ、冷えと疲労を悪化させる', '砂糖：血糖値の乱高下で疲労を増し、冷えを助長する', '小麦：消化に大きな負担をかけ、腸の状態を悪化させる', '乳製品：体を冷やし、消化に負担をかける']
    }
  };

  // 陰陽シンボルのSVGコンポーネント
  const YinYangSymbol = () => (
    <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-20">
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M 50 2 A 48 48 0 0 1 50 98 A 24 24 0 0 1 50 50 A 24 24 0 0 0 50 2" fill="currentColor"/>
      <circle cx="50" cy="26" r="8" fill="white"/>
      <circle cx="50" cy="74" r="8" fill="currentColor"/>
    </svg>
  );

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 p-4 sm:p-6 relative overflow-hidden">
        {/* 和紙テクスチャ効果 */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }}></div>
        
        {/* 装飾的な陰陽シンボル */}
        <div className="absolute top-10 right-10 text-amber-800">
          <YinYangSymbol />
        </div>
        <div className="absolute bottom-10 left-10 text-amber-800">
          <YinYangSymbol />
        </div>

        <div className="w-full max-w-full sm:max-w-2xl mx-auto relative z-10 px-4 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mx-4 border-2 border-amber-200 w-full">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-amber-900 mb-2" style={{fontFamily: "'Noto Serif JP', serif"}}>
                体質診断
              </h1>
              <div className="grid grid-cols-2 gap-2 mt-4 text-amber-700 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <Droplet size={16} />
    <Snowflake size={16} />
                  <span className="text-sm">虚×寒</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet size={16} />
    <Sun size={16} />
                  <span className="text-sm">虚×熱</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} />
    <Snowflake size={16} />
                  <span className="text-sm">実×寒</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} />
    <Sun size={16} />
                  <span className="text-sm">実×熱</span>
                </div>
              </div>
            </div>
            
            <p className="text-amber-800 mb-6 text-center" style={{fontFamily: "'Noto Serif JP', serif"}}>
              あなたの体質を診断します。
            </p>
            
            

            <div className="mb-6">
              <h3 className="text-lg font-bold text-amber-900 mb-4" style={{fontFamily: "'Noto Serif JP', serif"}}>基本情報を入力してください</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-amber-800 mb-2">年齢</label>
                  <input type="number" min="1" max="120" value={userInfo.age} onChange={(e) => setUserInfo({...userInfo, age: e.target.value})} className="w-full p-3 border-2 border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none bg-white/50" placeholder="例: 35" />
                </div>
                <div>
                  <label className="block text-amber-800 mb-2">性別</label>
                  <div className="flex gap-4">
                    <button onClick={() => setUserInfo({...userInfo, gender: '男性'})} className={`flex-1 p-3 rounded-lg border-2 transition ${userInfo.gender === '男性' ? 'border-amber-600 bg-amber-100 font-bold text-amber-900' : 'border-amber-300 hover:border-amber-400 text-amber-700'}`}>男性</button>
                    <button onClick={() => setUserInfo({...userInfo, gender: '女性'})} className={`flex-1 p-3 rounded-lg border-2 transition ${userInfo.gender === '女性' ? 'border-amber-600 bg-amber-100 font-bold text-amber-900' : 'border-amber-300 hover:border-amber-400 text-amber-700'}`}>女性</button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => { if (userInfo.age && userInfo.gender) { setStep('questions'); } else { alert('年齢と性別を入力してください'); } }} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition flex items-center justify-center gap-2 shadow-lg">
              診断を始める<ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const currentQuestionIndex = Object.keys(answers).length;
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 p-4 sm:p-6 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }}></div>
        
        <div className="w-full max-w-2xl relative z-10 px-3 mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-amber-200">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-amber-800 mb-2">
                <span>質問 {currentQuestionIndex + 1} / {questions.length}</span>
                <span>{Math.round((currentQuestionIndex / questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full transition-all" style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }} />
</div>
</div>
{currentQuestion && (
<>
<h2 className="text-2xl font-bold text-amber-900 mb-6" style={{fontFamily: "'Noto Serif JP', serif"}}>{currentQuestion.question}</h2>
<div className="space-y-3">
{currentQuestion.options.map((option, index) => (
<button key={index} onClick={() => { handleAnswer(currentQuestion.id, option); if (currentQuestionIndex === questions.length - 1) { setTimeout(handleSubmit, 300); } }} className="w-full text-left p-4 border-2 border-amber-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition text-amber-800">{option.label}</button>
))}
</div>
</>
)}
</div>
</div>
</div>
);
}
if (step === 'results' && results) {
const constitution = constitutionTypes[results.type];
const ageGroup = parseInt(userInfo.age) < 40 ? '若年層' : parseInt(userInfo.age) < 60 ? '中年層' : '高齢層';
const ageGenderAdvice = getAgeGenderAdvice(userInfo.age, userInfo.gender);
return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 p-4 sm:p-6 pb-20 relative overflow-hidden flex justify-center">
    <div className="absolute inset-0 opacity-30" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
    }}></div>
    
    <div className="w-full max-w-4xl mx-auto relative z-10 px-2 sm:px-0">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border-2 border-amber-200">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-amber-900" style={{fontFamily: "'Noto Serif JP', serif"}}>診断結果</h1>
          <div className="text-right text-sm text-amber-700">
            <div>{userInfo.age}歳 / {userInfo.gender}</div>
            <div className="text-xs text-amber-600 mt-1">({ageGroup})</div>
          </div>
        </div>
        <div className={`bg-gradient-to-r ${constitution.color} rounded-xl p-8 text-white shadow-lg`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-bold mb-2 opacity-90">あなたの体質タイプ</div>
              <h2 className="text-4xl font-bold mb-4" style={{fontFamily: "'Noto Serif JP', serif"}}>{constitution.name}</h2>
              <p className="text-lg">{constitution.description}</p>
            </div>
            <div className="text-white opacity-80">
              {constitution.icon}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border-2 border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4" style={{fontFamily: "'Noto Serif JP', serif"}}>体質の特徴</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {constitution.characteristics.map((char, index) => (
            <div key={index} className="flex items-start">
              <Check className="text-amber-600 mr-2 flex-shrink-0 mt-1" size={20} />
              <span className="text-amber-800">{char}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border-2 border-amber-200">
        <div className="bg-orange-50/50 rounded-xl p-6 mb-6 border border-orange-200">
          <h3 className="text-lg font-bold text-orange-800 mb-3" style={{fontFamily: "'Noto Serif JP', serif"}}>⚠️ 注意すべき健康リスク</h3>
          <div className="grid md:grid-cols-3 gap-2">
            {constitution.healthRisks.map((risk, index) => (
              <div key={index} className="flex items-center">
                <span className="text-orange-600 mr-2">•</span>
                <span className="text-amber-800">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50/50 rounded-xl p-6 mb-6 border border-purple-200">
          <h3 className="text-lg font-bold text-purple-800 mb-3" style={{fontFamily: "'Noto Serif JP', serif"}}>👤 あなたへのアドバイス</h3>
          <ul className="space-y-2">
            {ageGenderAdvice.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 mr-2">▸</span>
                <span className="text-amber-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-3" style={{fontFamily: "'Noto Serif JP', serif"}}>💡 生活習慣のアドバイス</h3>
          <ul className="space-y-2">
            {constitution.advice.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">▸</span>
                <span className="text-amber-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border-2 border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4" style={{fontFamily: "'Noto Serif JP', serif"}}>食生活のアドバイス</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-3">積極的に摂りたい食品</h3>
            <ul className="space-y-2">
              {constitution.dietary.good.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-amber-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-3">避けたい食品</h3>
            <ul className="space-y-2">
              {constitution.dietary.avoid.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span className="text-amber-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-300 rounded-2xl shadow-2xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4" style={{fontFamily: "'Noto Serif JP', serif"}}>⚠️ 四毒について - 特に気をつけたい食品</h2>
        <ul className="space-y-2 mb-6">
          {constitution.fourPoisons.map((poison, index) => (
            <li key={index} className="flex items-start bg-white/70 p-3 rounded-lg">
              <AlertCircle className="text-red-600 mr-2 flex-shrink-0 mt-1" size={20} />
              <span className="text-amber-900">{poison}</span>
            </li>
          ))}
        </ul>
        <div className="bg-red-100/70 border-l-4 border-red-600 p-4 rounded">
          <p className="font-bold text-red-900 mb-2">全ての体質タイプに共通する最重要事項</p>
          <p className="text-red-800"><strong>質の悪い植物性油脂</strong>（トランス脂肪酸を含むマーガリン、ショートニング、酸化した古い油など）は、どの体質タイプの方にも悪影響を及ぼします。必ず避けましょう。</p>
        </div>
      </div>

      <button onClick={() => { setStep('intro'); setAnswers({}); setResults(null); setUserInfo({ age: '', gender: '' }); }} className="w-full bg-gradient-to-r from-amber-700 to-stone-700 text-white py-3 rounded-lg font-bold hover:from-amber-800 hover:to-stone-800 transition shadow-lg">もう一度診断する</button>
    </div>
  </div>
);
}
return null;
};
export default ConstitutionDiagnosisApp;