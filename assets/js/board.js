const KEY='uzick_board_v2';
const seed=[
{id:101,title:'[필독] 우직항공 공식 홈페이지 이용 및 탑승 안내',author:'운항관리팀',category:'공지',date:'2026-08-14',official:true,content:`우직항공 공식 홈페이지에 오신 것을 환영합니다.

본 홈페이지는 우직항공의 공식 운항 정보와 캐릭터 소식, 기장 및 승무원 프로필을 안내하는 온라인 탑승구입니다.

■ 주요 서비스
1. 홈: 오늘의 기장·부기장, 서울 실시간 날씨 및 세계 주요 도시 시각
2. 기장 소개: 한국·해외 기장, 객실 승무원 및 공항 경찰의 공식 프로필
3. 사내 게시판: 운항 공지, 근무 일정 및 구성원 소식
4. 사진첩: 우직항공의 비행 및 일상 기록

■ 이용 안내
사내 게시판에서 직접 작성한 글은 현재 사용 중인 브라우저에만 저장됩니다. 브라우저 데이터 삭제 또는 기기 변경 시 작성한 내용이 유지되지 않을 수 있으니 중요한 내용은 별도로 보관해 주시기 바랍니다.

안전하고 즐거운 비행 경험을 제공할 수 있도록 지속적으로 새로운 소식을 전하겠습니다.

감사합니다.
우직항공 운항관리팀`},
{id:102,title:'2026년 8월 기장 및 부기장 비행 일정 안내',author:'운항관리팀',category:'일정',date:'2026-08-12',official:true,schedule:true,content:`2026년 8월 기장 및 부기장 비행 일정을 안내드립니다.

이번 달 국내선 및 국제선 운항 담당자와 주요 비행 일정은 첨부 예정인 월간 운항표를 통해 확인해 주시기 바랍니다.

■ 적용 기간
2026년 8월 1일 ~ 8월 31일

■ 확인 사항
• 운항 일정은 기상 상황과 공항 운영 사정에 따라 변경될 수 있습니다.
• 변경 사항은 본 게시글을 통해 추가 공지합니다.
• 개인별 세부 브리핑 시각은 사내 운항 지침을 우선 적용합니다.

※ 월간 일정 이미지는 추후 본문에 첨부될 예정입니다.`},
{id:103,title:'지갑 분실',author:'차선우',category:'기타',date:'2026-08-18',content:'지갑 잃어버렸는데 보신 분.. ㅠㅠ?\n\n아마 승무원 라운지나 브리핑룸 근처에서 떨어뜨린 것 같아요. 네이비색 반지갑이고 안쪽에 제 사원증이 들어 있습니다. 발견하신 분은 댓글 대신 저한테 바로 알려주세요!'}
];
let stored=JSON.parse(localStorage.getItem(KEY)||'null');
let posts=Array.isArray(stored)?stored:seed;
seed.forEach(item=>{if(!posts.some(p=>p.id===item.id))posts.push(item)});
posts.sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);save();
function save(){localStorage.setItem(KEY,JSON.stringify(posts))}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function dateLabel(date){const [,m,d]=date.split('-');return `${Number(m)}월 ${Number(d)}일`}
function render(){const q=($('#boardSearch')?.value||'').toLowerCase(),cat=$('#boardCategory')?.value||'all';const rows=posts.filter(p=>(cat==='all'||p.category===cat)&&(p.title+p.content+p.author).toLowerCase().includes(q));$('#boardBody').innerHTML=rows.length?rows.map(p=>`<tr class="board-row" tabindex="0" role="link" aria-label="${esc(p.title)} 게시글 열기" onclick="viewPost(${p.id})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();viewPost(${p.id})}"><td><span class="board-title">${p.official?'<b class="official-mark">공식</b>':''}${esc(p.title)}</span></td><td><span class="category-pill">${esc(p.category)}</span></td><td>${esc(p.author)}</td><td>${dateLabel(p.date)}</td></tr>`).join(''):'<tr><td colspan="4" class="empty">검색 결과가 없습니다.</td></tr>'}
function form(p={}){UZ.openModal(`<h2>${p.id?'게시글 수정':'새 글 작성'}</h2><form id="postForm" class="form-grid"><input type="hidden" name="id" value="${p.id||''}"><label>제목<input class="field" required maxlength="80" name="title" value="${esc(p.title||'')}"></label><label>분류<select class="field" name="category"><option>공지</option><option>일정</option><option>자유</option><option>기타</option></select></label><label class="full">작성자<input class="field" required maxlength="20" name="author" value="${esc(p.author||'')}"></label><label class="full">내용<textarea class="field" required maxlength="3000" name="content">${esc(p.content||'')}</textarea></label><div class="full actions"><button class="btn" type="submit">저장하기</button><button class="btn ghost" type="button" onclick="UZ.closeModal()">취소</button></div></form>`);if(p.category)$('#postForm [name=category]').value=p.category;$('#postForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),id=Number(f.get('id'));const data={id:id||Date.now(),title:f.get('title').trim(),category:f.get('category'),author:f.get('author').trim(),content:f.get('content').trim(),date:id?(posts.find(x=>x.id===id)?.date||new Date().toISOString().slice(0,10)):new Date().toISOString().slice(0,10)};posts=id?posts.map(x=>x.id===id?{...x,...data}:x):[data,...posts];save();render();UZ.closeModal();UZ.toast('게시글을 저장했습니다.')}}
window.showScheduleImage=()=>UZ.openModal(`<img class="schedule-full-image" src="assets/images/schedule-2026-08.png" alt="2026년 8월 기장 및 부기장 비행 스케줄표">`);
window.viewPost=id=>{const p=posts.find(x=>x.id===id);if(!p)return;const attachment=p.schedule?`<figure class="schedule-image-wrap"><button type="button" onclick="showScheduleImage()" aria-label="8월 비행 일정표 크게 보기"><img src="assets/images/schedule-2026-08.png" alt="2026년 8월 기장 및 부기장 비행 스케줄표"></button><figcaption>2026년 8월 기장 및 부기장 월간 운항표 · 이미지를 누르면 크게 볼 수 있습니다.</figcaption></figure>`:'';UZ.openModal(`<article class="board-article"><header><div><span class="category-pill">${esc(p.category)}</span>${p.official?'<span class="official-label">UZICK OFFICIAL</span>':''}</div><h2>${esc(p.title)}</h2><p class="article-meta"><strong>${esc(p.author)}</strong><span>${dateLabel(p.date)}</span><span>조회 ${String(120+p.id).slice(-3)}</span></p></header>${attachment}<div class="article-content">${esc(p.content).replaceAll('\n','<br>')}</div><footer><span>UZICK AIRLINE · CREW LOUNGE</span></footer></article><div class="actions"><button class="btn ghost" onclick="UZ.closeModal()">목록으로</button><button class="btn" onclick="UZ.closeModal();editPost(${p.id})">수정</button><button class="btn danger" onclick="deletePost(${p.id})">삭제</button></div>`)}
window.editPost=id=>form(posts.find(x=>x.id===id));
window.deletePost=id=>{if(confirm('이 게시글을 삭제할까요?')){posts=posts.filter(x=>x.id!==id);save();render();UZ.closeModal();UZ.toast('삭제했습니다.')}}
$('#newPost')?.addEventListener('click',()=>form());$('#boardSearch')?.addEventListener('input',render);$('#boardCategory')?.addEventListener('change',render);render();



