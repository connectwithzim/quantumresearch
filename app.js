import { I18N } from './translations.js';
import { API_BASE, RESEARCHER_CONTACT, RETENTION_NOTICE } from './config.js';
const $=id=>document.getElementById(id);
const qs=selector=>document.querySelector(selector);
const state={language:'tr',token:null,assignment:null,stage:'M',submitting:false};
const SCREEN_VALS=['<2h','2-4h','4-6h','>6h'];
const ui={
 tr:{consentTitle:'Katılım ve onam',consentLabel:'Gönüllü olarak katılıyorum.', consentText:'Katılım isteğe bağlıdır. Bu çalışma dijital gözetim, kişisel güvenlik ve küçük gruplarda ortak eylem hakkında sorular içerir. Soru sıraları araştırma amaçlı değişebilir.\n\nBölümler tek tek gösterilir. Devam ettiğinizde o bölümün yanıtları araştırma veritabanına kaydedilir ve değiştirilemez. Anketi tamamlamadan ayrılırsanız kısmi yanıtlarınız son etkinlikten 30 gün sonra silinir; kısmi yanıtlar Google Sheets ve yedeklere gönderilmez. Tamamlanan kayıtlar için aşağıdaki saklama politikası geçerlidir.\n\nKayıtlarda ülke ve varsa grup adı bulunur. Grup adında kişisel bilgi kullanmayın. IP adresi araştırma yanıt alanı olarak kaydedilmez; altyapı sağlayıcıları bağlantı bilgilerini işleyebilir.\n\nİletişim: {email}\nTamamlanan veri saklama: {retention}', continue:'Ankete devam et',required:'Lütfen gönüllü katılımınızı onaylayın.',groupNote:'İstediğiniz grup adını seçebilirsiniz; her üyeden tanımlama için birebir aynı grup adını yazması istenir.',saveHint:'Devam ettiğinizde bu bölüm kaydedilir ve kilitlenir. Önceki bölümlere dönemezsiniz.',saveError:'Kaydetme başarısız. Sayfayı kapatmadan bağlantıyı kontrol edip yeniden deneyin.',fillAll:'Lütfen bu sayfadaki tüm zorunlu alanları tamamlayın.',groupRequired:'Lütfen grup adını yazın.',getting:'Sunucuya bağlanılıyor…',setup:'Araştırma sunucusu yapılandırılmadı.',warning:'Bu açıklama etik kurul incelemesinin yerine geçmez.',footer:'Katılım gönüllüdür. İletişim: {email}',lockHelp:'Devam ettiğinizde mevcut bölümün yanıtları kalıcı olarak kilitlenir.',stage:'Bölüm {n} / 3', next:'Kaydet ve devam et',final:'Yanıtları gönder',readyTitle:'Yanıtlarınız kilitlendi',readyText:'Tüm bölümler tamamlandı. Nihai kaydı tamamlamak için Gönder düğmesine basın.',submitting:'Kaydediliyor…',tyDesc:'Yanıtlarınız araştırma veritabanına kaydedildi.',another:'Yeni katılımcı başlat'},
 en:{consentTitle:'Participation and consent',consentLabel:'I am participating voluntarily.', consentText:'Participation is voluntary. This study asks about digital surveillance, personal safety, and collective action in small groups. Question order may vary for research purposes.\n\nSections appear one at a time. When you continue, that section’s answers are saved in the research database and cannot be changed. If you leave without finishing, partial answers are deleted 30 days after your last activity; they are not copied to Google Sheets or backups. Completed records follow the retention policy below.\n\nCountry details and a group name, if provided, are included in records. Do not include personal information in group names. IP addresses are not collected as answer fields; infrastructure providers may process connection metadata.\n\nResearcher: {email}\nCompleted data retention: {retention}',continue:'Continue to questionnaire',required:'Please confirm voluntary participation.',groupNote:'You can choose whatever group name you want, but every member is requested to put the exact same group name for identification purposes.',saveHint:'When you continue, this section is saved and locked. You cannot return to earlier sections.',saveError:'Unable to save. Check your connection and try again without closing this page.',fillAll:'Please complete all required fields on this page.',groupRequired:'Please enter a group name.',getting:'Connecting to survey server…',setup:'Research server is not configured.',warning:'This statement does not replace institutional ethics review.',footer:'Participation is voluntary. Contact: {email}',lockHelp:'Continuing permanently locks the answers on this page.',stage:'Section {n} of 3',next:'Save and continue',final:'Submit responses',readyTitle:'Your answers are locked',readyText:'All sections are complete. Click Submit to finalize your response.',submitting:'Saving…',tyDesc:'Your responses were saved to the research database.',another:'Start another participant'},
 ar:{consentTitle:'المشاركة والموافقة',consentLabel:'أشارك بمحض إرادتي.', consentText:'المشاركة طوعية. تتناول الدراسة المراقبة الرقمية والسلامة الشخصية والعمل الجماعي في مجموعات صغيرة. قد يختلف ترتيب الأسئلة لأغراض البحث.\n\nتظهر الأقسام واحداً تلو الآخر. عند المتابعة تُحفظ إجابات القسم في قاعدة بيانات البحث ولا يمكن تعديلها. إذا غادرت قبل إكمال الاستبيان، تُحذف الإجابات الجزئية بعد 30 يوماً من آخر نشاط، ولا تُنسخ إلى جداول Google أو النسخ الاحتياطية. تخضع السجلات المكتملة لسياسة الاحتفاظ أدناه.\n\nتتضمن السجلات معلومات البلد واسم المجموعة إن وُجد. لا تستخدم بيانات شخصية في اسم المجموعة. لا يُجمع عنوان IP ضمن حقول الإجابة، وقد يعالج مزودو البنية التحتية بيانات الاتصال.\n\nالباحث: {email}\nالاحتفاظ بالبيانات المكتملة: {retention}',continue:'متابعة الاستبيان',required:'يرجى تأكيد المشاركة الطوعية.',groupNote:'يمكنك اختيار أي اسم للمجموعة، لكن يُطلب من كل عضو إدخال الاسم نفسه تماماً لأغراض التعريف.',saveHint:'عند المتابعة تُحفظ إجابات هذا القسم وتُقفل، ولا يمكنك العودة إلى الأقسام السابقة.',saveError:'تعذر الحفظ. تحقق من الاتصال وأعد المحاولة دون إغلاق الصفحة.',fillAll:'يرجى ملء جميع الحقول المطلوبة في هذه الصفحة.',groupRequired:'يرجى إدخال اسم المجموعة.',getting:'جارٍ الاتصال بالخادم…',setup:'لم يُضبط خادم البحث.',warning:'هذه المعلومات لا تغني عن مراجعة أخلاقيات البحث المؤسسية.',footer:'المشاركة طوعية. التواصل: {email}',lockHelp:'عند المتابعة تُقفل إجابات هذه الصفحة بصورة دائمة.',stage:'القسم {n} من 3',next:'حفظ ومتابعة',final:'إرسال الإجابات',readyTitle:'تم قفل إجاباتك',readyText:'اكتملت جميع الأقسام. اضغط إرسال لإتمام التسجيل.',submitting:'جارٍ الحفظ…',tyDesc:'حُفظت إجاباتك في قاعدة بيانات البحث.',another:'بدء مشارك جديد'}
};
function u(k){return ui[state.language][k]||'';}
function setText(id,text){if($(id))$(id).textContent=text;}
function makeOptions(name,vals,labels,scale=false){const box=document.createElement('div');box.className=scale?'scale-options':'options';
 vals.forEach((val,i)=>{const label=document.createElement('label');label.className='option';const el=document.createElement('input');el.type='radio';el.name=name;el.value=String(val);el.required=true;const txt=document.createElement('span');txt.textContent=String(labels[i]);label.append(el,txt);box.append(label);});return box;}
function makeQuestion(code,title,values,labels,help,scale=false,low='',high=''){
 const div=document.createElement('div');div.className='question';const titleEl=document.createElement('label');titleEl.className='question-title';titleEl.textContent=title;
 const helper=document.createElement('p');helper.className='question-help';helper.textContent=help;
 div.append(titleEl,helper,makeOptions(code,values,labels,scale));
 if(scale){const note=document.createElement('div');note.className='scale-notes';const left=document.createElement('span'),right=document.createElement('span');left.textContent=low;right.textContent=high;note.append(left,right);div.append(note);}return div;
}
function configured(){return /^https:\/\/[\w.-]+/.test(API_BASE)&&!API_BASE.includes('YOUR-WORKER')&&RESEARCHER_CONTACT!=='researcher@example.org'&&!RETENTION_NOTICE.startsWith('Research records will be retained according to');}
async function request(path,opts={}){if(!configured())throw Error(u('setup'));const c=new AbortController(),timeout=setTimeout(()=>c.abort(),18000);
 try{const r=await fetch(API_BASE+path,{...opts,signal:c.signal,headers:{'Content-Type':'application/json',...opts.headers},cache:'no-store'});let d;try{d=await r.json();}catch{throw Error('Unexpected server response');}if(!r.ok||!d.ok)throw Error(d.error||'HTTP '+r.status);return d;}finally{clearTimeout(timeout);}}
function stageNumber(stage){if(stage==='M')return 1;if(stage==='FINISH'||stage==='DONE')return 3;const first=state.assignment==='FORM_BA'?'B':'A';return stage===first?2:3;}
function renderStage(){const stage=state.stage;const t=I18N[state.language];$('consentView').hidden=true;$('surveyView').hidden=false;$('doneView').hidden=true;
 const number=stageNumber(stage);setText('stageCount',u('stage').replace('{n}',number));document.querySelectorAll('.stage-bars span').forEach((bar,i)=>bar.classList.toggle('active',i<number));
 $('mPage').hidden=stage!=='M';$('scenarioPage').hidden=!['A','B'].includes(stage);$('finishPage').hidden=stage!=='FINISH';
 $('scenarioSections').replaceChildren();
 if(stage==='M'){
    const group=$('groupOptions');group.replaceChildren();group.append(makeOptions('participation_mode',['Group','Individual'],[t.groupYes,t.groupNo]));
    const box=$('m0Questions');box.replaceChildren();
    box.append(makeQuestion('M0_1',t.m01Q,SCREEN_VALS,[t.m01A,t.m01B,t.m01C,t.m01D],t.m01Help));
    box.append(makeQuestion('M0_2',t.m02Q,[1,2,3,4,5],[1,2,3,4,5],t.m02Help,true,t.m02Low,t.m02High));
    box.append(makeQuestion('M0_3',t.m03Q,[1,2,3,4,5],[1,2,3,4,5],t.m03Help,true,t.m03Low,t.m03High));
    toggleGroup();
 }else if(['A','B'].includes(stage)){
    const box=document.createElement('div');box.className='card';const heading=document.createElement('h2');heading.textContent=u('stage').replace('{n}',number);box.append(heading);
    // Deliberately do not display either scenario label or descriptions that reveal the experimental hypothesis.
    for(let i=1;i<=3;i++){const code=stage+i;box.append(makeQuestion(code,t[code.toLowerCase()+'Q'],[1,0],[t.yes,t.no],t[code.toLowerCase()+'Help']));}
    $('scenarioSections').append(box);
 }
 setText('readyTitle',u('readyTitle'));setText('readyText',u('readyText'));setText('lockHelp',u('lockHelp'));
 setText('nextBtn',stageNumber(stage)===3?u('final'):u('next'));
 setText('saveMessage','');setText('saveHint',stage==='FINISH'?'':u('saveHint'));window.scrollTo(0,0);
}
function toggleGroup(){const isGroup=qs('input[name="participation_mode"]:checked')?.value==='Group';$('groupField').hidden=!isGroup;$('groupName').required=isGroup;if(!isGroup)$('groupName').value='';}
function updateLanguage(language){
 const existing=Object.fromEntries([...document.querySelectorAll('#surveyView input[type=radio]:checked')].map(x=>[x.name,x.value]));
 state.language=language;const t=I18N[language];document.documentElement.lang=language;document.documentElement.dir=t.dir;
 document.querySelectorAll('.lang-btn').forEach(b=>{b.classList.toggle('active',b.dataset.lang===language);b.setAttribute('aria-pressed',String(b.dataset.lang===language));});
 for(const [id,key] of Object.entries({title:'title',subtitle:'subtitle',backgroundTitle:'bgTitle',backgroundDesc:'bgDesc',originLabel:'originLabel',residenceLabel:'residenceLabel',groupQuestion:'groupLabel',groupNameLabel:'groupNameLabel',m0Title:'m0Title',m0Desc:'m0Desc',doneTitle:'tyTitle'}))setText(id,t[key]);
 setText('consentTitle',u('consentTitle'));setText('consentLabel',u('consentLabel'));
 setText('consentInfo',u('consentText').replace('{email}',RESEARCHER_CONTACT).replace('{retention}',RETENTION_NOTICE));
 setText('consentWarning',configured()?'':u('warning'));setText('startBtn',u('continue'));setText('groupNote',u('groupNote'));
 setText('originLabel',t.originLabel);setText('residenceLabel',t.residenceLabel);
 $('origin').placeholder=t.originPlaceholder;$('residence').placeholder=t.residencePlaceholder;$('groupName').placeholder=t.groupNamePlaceholder;
 setText('footerText',u('footer').replace('{email}',RESEARCHER_CONTACT));
 if(state.token&&state.assignment&&state.stage!=='DONE'){
   renderStage();
   for(const [name,value] of Object.entries(existing)){const input=[...document.querySelectorAll('#surveyView input[type=radio]')].find(x=>x.name===name&&x.value===value);if(input)input.checked=true;}
   toggleGroup();
 }
}
function uuid(){if(crypto?.randomUUID)return crypto.randomUUID();throw Error('Secure browser required');}
async function start(){if(!$('consentCheck').checked){setText('consentWarning',u('required'));return;}
 $('startBtn').disabled=true;setText('consentWarning',u('getting'));
 try{state.token=localStorage.getItem('survey_v2_token')||uuid();localStorage.setItem('survey_v2_token',state.token);
 const d=await request('/api/start',{method:'POST',body:JSON.stringify({token:state.token,consent:true})});state.assignment=d.assigned_form;state.stage=d.stage||'M';
 if(d.submitted||state.stage==='DONE')showComplete();else renderStage();
 }catch(err){setText('consentWarning',err.message);$('startBtn').disabled=false;}
}
function selected(name){const el=qs('input[name="'+name+'"]:checked');if(!el){qs('input[name="'+name+'"]')?.focus();throw Error(u('fillAll'));}return el.value;}
function collect(){if(state.stage==='M'){
    if(!$('origin').value.trim()||!$('residence').value.trim())throw Error(u('fillAll'));
    const mode=selected('participation_mode');if(mode==='Group'&&!$('groupName').value.trim())throw Error(u('groupRequired'));
    return {language:state.language,origin_country:$('origin').value.trim(),residence_country:$('residence').value.trim(),participation_mode:mode,group_name:mode==='Group'?$('groupName').value.trim():'',consent:true,M0_1:selected('M0_1'),M0_2:Number(selected('M0_2')),M0_3:Number(selected('M0_3'))};
 }
 if(state.stage==='A'||state.stage==='B')return Object.fromEntries([1,2,3].map(i=>[state.stage+i,Number(selected(state.stage+i))]));
 return {};
}
async function next(){if(state.submitting)return;state.submitting=true;$('nextBtn').disabled=true;setText('saveMessage',u('submitting'));
 try{
   if(state.stage==='FINISH'){await request('/api/finish',{method:'POST',body:JSON.stringify({token:state.token})});showComplete();return;}
   const section=state.stage,answers=collect();const res=await request('/api/section',{method:'POST',body:JSON.stringify({token:state.token,section,answers})});
   state.stage=res.stage;
   if(state.stage==='FINISH'){try{await request('/api/finish',{method:'POST',body:JSON.stringify({token:state.token})});showComplete();return;}catch{renderStage();setText('saveMessage',u('saveError'));return;}}
   if(state.stage==='DONE')showComplete();else renderStage();
 }catch(err){setText('saveMessage',u('saveError')+' '+err.message);}
 finally{state.submitting=false;$('nextBtn').disabled=false;}
}
function showComplete(){state.stage='DONE';$('consentView').hidden=true;$('surveyView').hidden=true;$('doneView').hidden=false;setText('doneDesc',u('tyDesc'));
 if(!$('anotherBtn')){const b=document.createElement('button');b.id='anotherBtn';b.type='button';b.className='secondary';b.addEventListener('click',()=>{
  if(!confirm(state.language==='tr'?'Bu cihazda yeni katılımcı başlatılsın mı?':state.language==='ar'?'بدء مشارك جديد على هذا الجهاز؟':'Start a new participant on this device?'))return;
  localStorage.removeItem('survey_v2_token');state.token=null;state.assignment=null;state.stage='M';$('consentCheck').checked=false;$('startBtn').disabled=true;
  document.querySelectorAll('#surveyView input[type=text]').forEach(x=>x.value='');document.querySelectorAll('#surveyView input[type=radio]').forEach(x=>x.checked=false);
  $('doneView').hidden=true;$('consentView').hidden=false;window.scrollTo(0,0);
 });$('doneView').append(b);}setText('anotherBtn',u('another'));window.scrollTo(0,0);
}
function initSurvey(){document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>updateLanguage(b.dataset.lang)));
 $('consentCheck').addEventListener('change',()=>$('startBtn').disabled=!$('consentCheck').checked);
 $('startBtn').addEventListener('click',start);$('nextBtn').addEventListener('click',next);$('groupOptions').addEventListener('change',toggleGroup);updateLanguage('tr');}
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
