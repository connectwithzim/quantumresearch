import { I18N } from './translations.js';
import { API_BASE, RESEARCHER_CONTACT, RETENTION_NOTICE } from './config.js';

const $ = (id) => document.getElementById(id);
const state = { language: 'tr', assignment: null, token: null, submitting: false };
const qs = (sel) => document.querySelector(sel);
const MISS = {
  tr: {consentTitle:'Katılım ve onam',consentLabel:'Gönüllü olarak katılıyorum.',consentText:'Katılımınız isteğe bağlıdır. Katılmamayı veya göndermeden önce ayrılmayı seçebilirsiniz. Bu anket dijital gözetim, kişisel güvenlik ve küçük gruplarda ortak eylem hakkında sorular içerir.\n\nKayıtlar bir araştırma kodu, ülke bilgileri ve (grup katılımında) seçtiğiniz grup adıyla saklanır. Araştırma ekibi sonuçları Cloudflare veritabanında, Google Sheets ve Google Drive yedeklerinde, isteğe bağlı olarak da e-posta yedeklerinde saklayabilir. IP adresiniz araştırma alanı olarak kaydedilmez; altyapı sağlayıcıları bağlantı metaverilerini işleyebilir. Grup adında kişisel bilgi kullanmayın. Soru sıraları araştırma amaçlı değişebilir.\n\nİletişim: {email}\nVeri saklama: {retention}',continue:'Ankete devam et',required:'İlerlemek için gönüllü katılımınızı onaylayın.', groupNote:'İstediğiniz grup adını seçebilirsiniz; tanımlama amacıyla her üyeden birebir aynı grup adını yazması istenir.', saveHint:'Başarı mesajı yalnızca yanıt araştırma veritabanına kaydedildikten sonra gösterilir. Google Sheets eşitlemesi gecikebilir.', saveError:'Yanıt kaydedilemedi. Sayfayı kapatmadan bağlantıyı kontrol edip yeniden deneyin.', fillAll:'Lütfen tüm zorunlu alanları doldurun.', groupRequired:'Grup katılımında grup adı zorunludur.', alreadyDone:'Bu tarayıcıdaki katılım daha önce kaydedildi.',another:'Yeni katılımcı başlat',getting:'Bağlantı kuruluyor…', setup:'Araştırma sunucusu henüz yapılandırılmadı. Lütfen araştırmacıyla iletişime geçin.', warning:'Bu metin, araştırmanız için etik kurul/onam incelemesinin yerini tutmaz.', sectionTitle:'Bölüm {n}: Kararlar ve tercihler', footer:'Katılım gönüllüdür. İletişim: {email}', consentStep:'01 / ONAM',backgroundStep:'02 / KATILIMCI', digitalStep:'03 / DİJİTAL DENEYİM',saved:'Yanıt araştırma veritabanına kaydedildi.'},
  en: {consentTitle:'Participation and consent',consentLabel:'I am participating voluntarily.',consentText:'Taking part is voluntary. You may decline or stop before submitting. Questions address digital surveillance, personal safety, and collective action in small groups.\n\nWe store a study code, country details and (if participating in a group) your chosen group name with answers. The study stores records in a Cloudflare database, synchronizes them to Google Sheets, and creates Google Drive backups; optional email backup files may also be sent. We do not record IP addresses as survey fields, although infrastructure providers may process connection metadata. Do not enter personal information in a group name. Question presentation order may vary for research purposes.\n\nResearcher contact: {email}\nRetention: {retention}',continue:'Continue to questionnaire',required:'Please confirm voluntary participation to continue.',groupNote:'You can choose whatever group name you want, but every member is requested to put the exact same group name for identification purposes.',saveHint:'Success is shown only after the research database confirms storage. Google Sheets synchronization may follow later.',saveError:'Your answers could not be saved. Check your connection and retry without closing this page.',fillAll:'Please answer every required question.',groupRequired:'Please enter a group name if you participate as a group.',alreadyDone:'A response from this browser session was already saved.',another:'Start another participant',getting:'Connecting to the survey server…',setup:'The research server has not been configured. Please contact the researcher.',warning:'This notice is a template requiring research ethics and privacy review before launch.',sectionTitle:'Part {n}: Decisions and preferences',footer:'Participation is voluntary. Contact: {email}',consentStep:'01 / CONSENT',backgroundStep:'02 / BACKGROUND',digitalStep:'03 / DAILY DIGITAL EXPERIENCE',saved:'Your response was saved to the research database.'},
  ar: {consentTitle:'المشاركة والموافقة',consentLabel:'أشارك بمحض إرادتي.',consentText:'المشاركة طوعية. يمكنك رفض المشاركة أو الانسحاب قبل إرسال الإجابات. تشمل الأسئلة المراقبة الرقمية والسلامة الشخصية والعمل الجماعي في مجموعات صغيرة.\n\nتُحفظ الإجابات برمز بحثي وبيانات البلد واسم المجموعة الذي تختاره عند المشاركة الجماعية. تُحفظ البيانات في قاعدة بيانات Cloudflare وتُنسخ إلى Google Sheets وتُنشأ نسخ احتياطية في Google Drive ويمكن إرسال نسخ بالبريد الإلكتروني. لا نسجل عنوان IP كحقل في الاستبيان، لكن مزودي الخدمة قد يعالجون بيانات الاتصال. لا تضع معلومات شخصية في اسم المجموعة. قد يختلف ترتيب الأسئلة لأغراض البحث.\n\nالتواصل: {email}\nالاحتفاظ بالبيانات: {retention}',continue:'متابعة إلى الاستبيان',required:'يرجى تأكيد المشاركة الطوعية للمتابعة.',groupNote:'يمكنك اختيار أي اسم للمجموعة، ولكن يُطلب من كل عضو إدخال اسم المجموعة نفسه تماماً لأغراض التعريف.',saveHint:'لا تظهر رسالة النجاح إلا بعد تأكيد الحفظ في قاعدة البيانات؛ قد تتأخر المزامنة مع Google Sheets.',saveError:'تعذر حفظ الإجابات. تحقق من الاتصال وحاول مجدداً دون إغلاق الصفحة.',fillAll:'يرجى الإجابة عن جميع الأسئلة المطلوبة.',groupRequired:'يرجى كتابة اسم المجموعة للمشاركة الجماعية.',alreadyDone:'تم حفظ إجابة سابقة من جلسة المتصفح هذه.',another:'بدء مشارك جديد',getting:'جارٍ الاتصال بخادم الاستبيان…',setup:'لم تُضبط خدمة البحث بعد. يرجى التواصل مع الباحث.',warning:'هذا النص نموذج ويحتاج إلى مراجعة الأخلاقيات والخصوصية قبل الإطلاق.',sectionTitle:'الجزء {n}: القرارات والتفضيلات',footer:'المشاركة طوعية. التواصل: {email}',consentStep:'01 / الموافقة',backgroundStep:'02 / معلومات المشارك',digitalStep:'03 / التجربة الرقمية',saved:'تم حفظ الإجابة في قاعدة بيانات البحث.'}
};
const MAIN_KEYS = ['A1','A2','A3','B1','B2','B3'];
const SCREEN_VALS = ['<2h','2-4h','4-6h','>6h'];
function translate(k){return MISS[state.language][k];}
function setText(id, value) { const el=$(id); if(el) el.textContent=value; }
function makeOptions(name, values, labels, scale=false) {
  const box=document.createElement('div'); box.className=scale?'scale-options':'options';
  for(let i=0;i<values.length;i++){
    const label=document.createElement('label');label.className='option';
    const input=document.createElement('input');input.type='radio';input.name=name;input.value=String(values[i]);input.required=true;
    const text=document.createElement('span');text.textContent=String(labels[i]);
    label.append(input,text);box.append(label);
  }
  return box;
}
function makeQuestion(name, question, values, labels, scale=false, low='', high=''){
  const wrap=document.createElement('div');wrap.className='question';
  const heading=document.createElement('label');heading.className='question-title';heading.textContent=question;
  wrap.append(heading,makeOptions(name,values,labels,scale));
  if(scale){const notes=document.createElement('div');notes.className='scale-notes';const l=document.createElement('span');l.textContent=low;const r=document.createElement('span');r.textContent=high;notes.append(l,r);wrap.append(notes);}
  return wrap;
}
function existingChoices(){return Object.fromEntries([...document.querySelectorAll('#surveyView input[type=radio]:checked')].map(el=>[el.name,el.value]));}
function restoreChoices(values){for(const [k,v] of Object.entries(values)){const el=[...document.querySelectorAll('#surveyView input[type=radio]')].find(x=>x.name===k&&x.value===v);if(el)el.checked=true;}}
function renderQuestions(){
  const chosen=existingChoices(),t=I18N[state.language];
  const groups=$('groupOptions');groups.replaceChildren();groups.append(makeOptions('participation_mode',['Group','Individual'],[t.groupYes,t.groupNo]));
  const m0=$('m0Questions');m0.replaceChildren();
  m0.append(makeQuestion('M0_1',t.m01Q,SCREEN_VALS,[t.m01A,t.m01B,t.m01C,t.m01D]));
  m0.append(makeQuestion('M0_2',t.m02Q,[1,2,3,4,5],[1,2,3,4,5],true,t.m02Low,t.m02High));
  m0.append(makeQuestion('M0_3',t.m03Q,[1,2,3,4,5],[1,2,3,4,5],true,t.m03Low,t.m03High));
  const container=$('scenarioSections');container.replaceChildren();
  const order=state.assignment?.assigned_form==='FORM_BA'?['B','A']:['A','B'];
  order.forEach((part,i)=>{
    const card=document.createElement('div');card.className='card';
    const step=document.createElement('span');step.className='step';step.textContent=String(i+4).padStart(2,'0')+' / '+(state.language==='tr'?'SORULAR':state.language==='ar'?'الأسئلة':'QUESTIONS');card.append(step);
    const title=document.createElement('h2');title.textContent=translate('sectionTitle').replace('{n}',String(i+2));card.append(title);
    const desc=document.createElement('p');desc.className='muted';desc.textContent=t['sec'+part+'Desc'];card.append(desc);
    for(let j=1;j<=3;j++){const code=part+j;card.append(makeQuestion(code,t[code.toLowerCase()+'Q'],[1,0],[t.yes,t.no]));}
    container.append(card);
  });
  restoreChoices(chosen);toggleGroup();
}
function toggleGroup(){const isGroup=qs('input[name=participation_mode]:checked')?.value==='Group';$('groupField').hidden=!isGroup;$('groupName').required=isGroup;if(!isGroup){$('groupName').value='';}}
function updateLanguage(lang){
  state.language=lang;const t=I18N[lang];document.documentElement.lang=lang;document.documentElement.dir=t.dir;
  document.querySelectorAll('.lang-btn').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang);b.setAttribute('aria-pressed',String(b.dataset.lang===lang));});
  for(const [id,key] of Object.entries({title:'title',subtitle:'subtitle',backgroundTitle:'bgTitle',backgroundDesc:'bgDesc',originLabel:'originLabel',residenceLabel:'residenceLabel',groupQuestion:'groupLabel',groupNameLabel:'groupNameLabel',m0Title:'m0Title',m0Desc:'m0Desc',submitBtn:'submit',doneTitle:'tyTitle',doneDesc:'tyDesc'})){setText(id,t[key]);}
  setText('consentTitle',translate('consentTitle'));setText('consentLabel',translate('consentLabel'));
  setText('consentInfo',translate('consentText').replace('{email}',RESEARCHER_CONTACT).replace('{retention}',RETENTION_NOTICE));
  setText('consentWarning',configured()?'':translate('warning'));setText('startBtn',translate('continue'));setText('groupNote',translate('groupNote'));
  setText('saveHint',translate('saveHint'));
  setText('originLabel',t.originLabel);setText('residenceLabel',t.residenceLabel);
  $('origin').placeholder=t.originPlaceholder;$('residence').placeholder=t.residencePlaceholder;$('groupName').placeholder=t.groupNamePlaceholder;
  setText('footerText',translate('footer').replace('{email}',RESEARCHER_CONTACT));renderQuestions();
}
function configured(){return /^https:\/\/[\w.-]+/.test(API_BASE)&&!API_BASE.includes('YOUR-WORKER')&&RESEARCHER_CONTACT!=='researcher@example.org'&&!RETENTION_NOTICE.startsWith('Research records will be retained according to');}
async function request(path, options={}){
  if(!configured()) throw new Error(translate('setup'));
  const ctrl=new AbortController();const timeout=setTimeout(()=>ctrl.abort(),12000);
  try{const r=await fetch(API_BASE+path,{...options,signal:ctrl.signal,headers:{'Content-Type':'application/json',...options.headers},cache:'no-store'});
    let result;try{result=await r.json();}catch{result={error:'Server returned an unexpected response.'};}
    if(!r.ok||!result.ok)throw new Error(result.error||('Request failed: HTTP '+r.status));return result;
  }finally{clearTimeout(timeout);}
}
function randomToken(){if(globalThis.crypto?.randomUUID)return crypto.randomUUID();throw Error('A secure browser connection is required.');}
async function start(){
  if(!$('consentCheck').checked){setText('consentWarning',translate('required'));return;}
  $('startBtn').disabled=true;setText('consentWarning',translate('getting'));
  try{
    state.token=localStorage.getItem('survey_v2_token')||randomToken();
    // Persist before network I/O so a timeout cannot allocate a second ID on retry.
    localStorage.setItem('survey_v2_token',state.token);
    const assigned=await request('/api/start',{method:'POST',body:JSON.stringify({token:state.token,consent:true})});
    // Only the anonymous token, never survey answers, is stored in this browser.
    state.assignment=assigned;
    if(assigned.submitted){showComplete();return;}
    renderQuestions();$('consentView').hidden=true;$('surveyView').hidden=false;window.scrollTo({top:0,behavior:'auto'});
  }catch(err){setText('consentWarning',err.message);$('startBtn').disabled=false;}
}
function validateAnswers(){
  const required=['origin','residence'];for(const id of required){const el=$(id);if(!el.value.trim()){el.focus();throw Error(translate('fillAll'));}}
  const checks=['participation_mode','M0_1','M0_2','M0_3',...MAIN_KEYS];
  for(const k of checks){const el=qs(`input[name="${k}"]:checked`);if(!el){const first=qs(`input[name="${k}"]`);first?.focus();throw Error(translate('fillAll'));}}
  if(qs('input[name=participation_mode]:checked').value==='Group'&&!$('groupName').value.trim()){$('groupName').focus();throw Error(translate('groupRequired'));}
  return {
    language:state.language,origin_country:$('origin').value.trim(),residence_country:$('residence').value.trim(),
    participation_mode:qs('input[name=participation_mode]:checked').value,
    group_name:qs('input[name=participation_mode]:checked').value==='Group'?$('groupName').value.trim():'',
    consent:true,
    M0_1:qs('input[name=M0_1]:checked').value,
    ...Object.fromEntries(['M0_2','M0_3',...MAIN_KEYS].map(k=>[k,Number(qs(`input[name=${k}]:checked`).value)]))
  };
}
async function submit(){
  if(state.submitting)return;
  try{
    const answers=validateAnswers();state.submitting=true;$('submitBtn').disabled=true;setText('saveMessage',I18N[state.language].submitting);
    await request('/api/submit',{method:'POST',body:JSON.stringify({token:state.token,answers})});
    showComplete();
  }catch(err){setText('saveMessage',translate('saveError')+' '+err.message);}
  finally{state.submitting=false;$('submitBtn').disabled=false;setText('submitBtn',I18N[state.language].submit);}
}
function showComplete(){
  $('consentView').hidden=true;$('surveyView').hidden=true;$('doneView').hidden=false;
  setText('doneDesc',I18N[state.language].tyDesc);
  if(!$('anotherBtn')){const b=document.createElement('button');b.id='anotherBtn';b.className='secondary';b.type='button';b.addEventListener('click',()=>{
    if(!confirm(state.language==='tr'?'Bu tarayıcıda yeni bir katılımcı başlatılsın mı?':state.language==='ar'?'هل تريد بدء مشارك جديد على هذا الجهاز؟':'Start a new participant on this device?'))return;
    localStorage.removeItem('survey_v2_token');state.token=null;state.assignment=null;$('consentCheck').checked=false;$('startBtn').disabled=true;$('doneView').hidden=true;$('consentView').hidden=false;document.querySelectorAll('#surveyView input[type=text]').forEach(e=>e.value='');document.querySelectorAll('#surveyView input[type=radio]').forEach(e=>e.checked=false);setText('consentWarning',translate('warning'));window.scrollTo(0,0);
  });$('doneView').append(b);}setText('anotherBtn',translate('another'));
  window.scrollTo(0,0);
}
function initSurvey(){
  document.querySelectorAll('.lang-btn').forEach(el=>el.addEventListener('click',()=>updateLanguage(el.dataset.lang)));
  $('consentCheck').addEventListener('change',()=>{$('startBtn').disabled=!$('consentCheck').checked;});
  $('startBtn').addEventListener('click',start);$('submitBtn').addEventListener('click',submit);
  $('groupOptions').addEventListener('change',toggleGroup);
  updateLanguage('tr');
}
async function initAdmin(){
  $('surveyRoot').hidden=true;$('adminRoot').hidden=false;let token='';
  const info=msg=>setText('adminMessage',msg);
  async function adminCall(path, method='GET'){
    const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),45000);
    try{const r=await fetch(API_BASE+path,{method,headers:{Authorization:'Bearer '+token},cache:'no-store',signal:ctrl.signal});const res=await r.json();if(!r.ok||!res.ok)throw Error(res.error||('HTTP '+r.status));return res;}finally{clearTimeout(timer);}
  }
  async function stats(){const d=await adminCall('/admin/stats');$('adminContent').hidden=false;
    setText('metricStarted',d.participants);setText('metricSubmitted',d.submissions);setText('metricAB',d.ab);setText('metricBA',d.ba);setText('metricPending',d.pending_sync);
    setText('backupStatus','Last backup: '+(d.last_backup?.backup_id||'never')+' — '+(d.last_backup?.status||'not started')+'; '+(d.last_backup?.detail||'No archive produced yet.'));
  }
  $('loginBtn').addEventListener('click',async()=>{token=$('adminToken').value.trim();if(!token){info('Paste your researcher token.');return;}try{await stats();info('Authenticated. Token held in memory only.');$('adminToken').value='';}catch(err){token='';info(err.message);}});
  $('logoutBtn').addEventListener('click',()=>{token='';$('adminToken').value='';$('adminContent').hidden=true;info('Access token cleared.');});
  $('refreshStats').addEventListener('click',async()=>{try{await stats();info('Status refreshed.');}catch(err){info(err.message);}});
  $('exportCsv').addEventListener('click',async()=>{try{const r=await fetch(API_BASE+'/admin/export.csv',{headers:{Authorization:'Bearer '+token},cache:'no-store'});if(!r.ok)throw Error('CSV export failed');const blob=await r.blob();const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='research_responses_'+new Date().toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);info('D1 CSV export downloaded.');}catch(err){info(err.message);}});
  for(const [id,path,confirmMessage] of [['retrySheets','/admin/retry-sync','Retry pending Google Sheets entries?'],['fullResync','/admin/full-resync','Mark ALL responses for Google Sheets resynchronization?'],['runBackup','/admin/backup','Create a new full Drive/email backup now?']]){
    $(id).addEventListener('click',async()=>{if(!confirm(confirmMessage))return;$(id).disabled=true;info('Working on '+path+'…');try{const res=await adminCall(path,'POST');info(JSON.stringify(res));await stats();}catch(err){info(err.message);}finally{$(id).disabled=false;}});
  }
}
if(new URLSearchParams(location.search).get('admin')==='1')initAdmin();else initSurvey();
