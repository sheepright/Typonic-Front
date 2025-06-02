export default function Guide() {
  const guideInfoItems = [
    {
      box: "안내사항",
      text: ": AI를 통해서 문장을 생성하고 표시하여 로딩시간이 지연될 수 있습니다. 선택 후 잠시만 기다려주세요.",
    },
    {
      box: "시작하기",
      text: ": 타자연습의 시작은 타이핑을 입력하는 시점부터 시작됩니다.",
    },
    {
      box: "주의사항",
      text: ": 줄 바꿈은 엔터를 통해서 비어있는 칸만큼 줄바꿈을 진행해주시고 코드 앞 빈 공간은 TAB을 통해서 진행해주시면 됩니다.",
    },
    {
      box: "랭킹등록",
      text: ": 이름과 이메일 통해서 등록되며 자신의 이메일을 사용하여 등록하여 주세요. (이메일은 랭킹 저장시에 중복체크에만 사용되며 폐기됩니다.)",
    },
    {
      box: "랭킹보기",
      text: ": 타수를 기준으로 랭킹이 매겨지며 동일한 타수일 경우 정확도를 통해서 나눠집니다.",
    },
  ];

  const guideItems = [
    {
      box: "소개",
      text: ": TYPONIC 서비스는 개발자 친화적인 코드 연습 및 단어 연습을 제공하며 사용자 맞춤 연습 서비스도 제공하고 있습니다.",
    },
    {
      box: "개발자",
      text: ": FE: 전주현, 양민재 BE: 안양우, 김건우",
    },
    {
      box: "더 나은 서비스",
      text: ": 서비스 개선과 요청사항이 있으시면 하단 이메일로 연락주시면 감사하겠습니다.",
    },
    {
      box: "GitHub",
      text: ": 해당 서비스는 GitHub에 Open Source로 올려져있습니다.",
    },
    {
      box: "Motif And Theme",
      text: ": 'MonkeyType' 서비스에서 영감 및 테마를 받아서 제작하였습니다.",
    },
  ];

  return (
    <div className="flex-col space-y-5 font-dung text-[15px]">
      <div className="mt-[10px]">
        <div className="text-[25px] mb-[8px]">서비스이용 가이드</div>
        {guideInfoItems.map((item, index) => (
          <div key={index} className="flex items-center mb-[8px]">
            <div className="w-auto h-[30px] p-[10px] bg-cdark rounded-[5px] shadow-lg flex justify-center items-center mr-3">
              {item.box}
            </div>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-[10px]">
        <div className="text-[25px] mb-[8px]">프로젝트 소개</div>
        {guideItems.map((item, index) => (
          <div key={index} className="flex items-center mb-[8px]">
            <div className="w-auto h-[30px] p-[10px] bg-cdark rounded-[5px] shadow-lg flex justify-center items-center mr-3">
              {item.box}
            </div>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}