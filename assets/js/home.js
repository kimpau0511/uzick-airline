const todayCaptains=[
{name:'현민규',id:'UZ-C101',line:'“차분하고 정확한 운항으로 목적지까지 함께하겠습니다.”'},
{name:'양규현',id:'UZ-C102',line:'“승객 여러분의 편안함을 가장 먼저 생각하겠습니다.”'},
{name:'권용우',id:'UZ-C103',line:'“어떤 바람에도 안정적인 비행을 약속드립니다.”'},
{name:'온새벽',id:'UZ-C104',line:'“오늘의 첫 비행을 안전하고 밝게 시작하겠습니다.”'},
{name:'천상우',id:'UZ-C105',line:'“기본을 지키는 믿음직한 운항으로 모시겠습니다.”'},
{name:'배민우',id:'UZ-C106',line:'“꼼꼼한 비행 계획으로 안전하게 운항하겠습니다.”'},
{name:'오하늘',id:'UZ-C107',line:'“하늘처럼 포근하고 부드러운 비행을 만들겠습니다.”'},
{name:'차선우',id:'UZ-C108',line:'“안전하고 편안한 운항으로 목적지까지 함께하겠습니다.”'},
{name:'온상현',id:'UZ-C109',line:'“정확한 판단과 세심한 조종으로 모시겠습니다.”'}
];
const todayCabinCrew=[
{name:'최은솔',id:'UZ-A201',line:'“세심한 객실 서비스로 편안한 비행을 준비하겠습니다.”'},
{name:'노성하',id:'UZ-A202',line:'“밝은 미소와 침착한 서비스로 객실을 책임지겠습니다.”'}
];
function nextRandom(list,key){const previous=Number(sessionStorage.getItem(key));let index=Math.floor(Math.random()*list.length);if(list.length>1&&index===previous)index=(index+1+Math.floor(Math.random()*(list.length-1)))%list.length;sessionStorage.setItem(key,index);return list[index]}
const captain=nextRandom(todayCaptains,'uzick_today_captain');
const cabin=nextRandom(todayCabinCrew,'uzick_today_cabin');
$('#todayCaptainName').textContent=`${captain.name} 기장`;
$('#todayCaptainMeta').textContent=`서울 → 파리 · UZ 701 · ${captain.id}`;
$('#todayCaptainLine').textContent=captain.line;
$('#todayCabinName').textContent=`${cabin.name} 승무원`;
$('#todayCabinMeta').textContent=`서울 → 파리 · UZ 701 · ${cabin.id}`;
$('#todayCabinLine').textContent=cabin.line;

