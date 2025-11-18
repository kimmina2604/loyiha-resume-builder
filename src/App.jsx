import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, Save, Eye, Edit3 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      profession: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const saveData = () => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
    alert('Ma\'lumotlar muvaffaqiyatli saqlandi! ✓');
  };

  const handlePersonalChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: '50' }]
    }));
  };

  const removeSkill = (id) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const updateSkill = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Rezyume - ${formData.personal.fullName || 'CV'}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
          .header { border-bottom: 3px solid #2962ff; padding-bottom: 20px; margin-bottom: 30px; }
          h1 { color: #2962ff; font-size: 32px; margin-bottom: 8px; }
          .profession { font-size: 18px; color: #666; margin-bottom: 15px; }
          .contact-info { font-size: 14px; color: #555; }
          .contact-info p { margin: 5px 0; }
          .section { margin-bottom: 30px; }
          .section-title { color: #2962ff; font-size: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
          .summary { font-size: 14px; line-height: 1.8; text-align: justify; }
          .item { margin-bottom: 20px; padding-left: 15px; border-left: 3px solid #2962ff; }
          .item-title { font-size: 16px; font-weight: bold; color: #333; margin-bottom: 5px; }
          .item-subtitle { font-size: 13px; color: #666; margin-bottom: 8px; }
          .item-description { font-size: 13px; line-height: 1.6; text-align: justify; }
          .skill { margin-bottom: 15px; }
          .skill-name { font-size: 14px; font-weight: 600; margin-bottom: 5px; display: flex; justify-content: space-between; }
          .skill-bar { height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden; }
          .skill-level { height: 100%; background-color: #2962ff; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${formData.personal.fullName || 'Ism Familiya'}</h1>
          <div class="profession">${formData.personal.profession || 'Kasb'}</div>
          <div class="contact-info">
            ${formData.personal.email ? `<p>📧 ${formData.personal.email}</p>` : ''}
            ${formData.personal.phone ? `<p>📱 ${formData.personal.phone}</p>` : ''}
            ${formData.personal.address ? `<p>📍 ${formData.personal.address}</p>` : ''}
          </div>
        </div>
        ${formData.personal.summary ? `<div class="section"><h2 class="section-title">Qisqacha ma'lumot</h2><p class="summary">${formData.personal.summary}</p></div>` : ''}
        ${formData.experience.length > 0 ? `<div class="section"><h2 class="section-title">Ish tajribasi</h2>${formData.experience.map(exp => `<div class="item"><div class="item-title">${exp.position}</div><div class="item-subtitle">${exp.company} | ${exp.startDate} - ${exp.endDate}</div>${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}</div>`).join('')}</div>` : ''}
        ${formData.education.length > 0 ? `<div class="section"><h2 class="section-title">Ta'lim</h2>${formData.education.map(edu => `<div class="item"><div class="item-title">${edu.degree}</div><div class="item-subtitle">${edu.institution} | ${edu.startDate} - ${edu.endDate}</div>${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}</div>`).join('')}</div>` : ''}
        ${formData.skills.length > 0 ? `<div class="section"><h2 class="section-title">Ko'nikmalar</h2>${formData.skills.map(skill => `<div class="skill"><div class="skill-name"><span>${skill.name}</span><span>${skill.level}%</span></div><div class="skill-bar"><div class="skill-level" style="width: ${skill.level}%"></div></div></div>`).join('')}</div>` : ''}
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => printWindow.print(), 250);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Onlayn Rezyume Konstruktori</h1>
          <p className="text-gray-600">Professional rezyumeni bir necha daqiqada yarating</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <button onClick={() => setActiveTab('personal')} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Shaxsiy</button>
              <button onClick={() => setActiveTab('experience')} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'experience' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Ish tajribasi</button>
              <button onClick={() => setActiveTab('education')} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'education' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Ta'lim</button>
              <button onClick={() => setActiveTab('skills')} className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${activeTab === 'skills' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Ko'nikmalar</button>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">To'liq ism</label><input type="text" value={formData.personal.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ism Familiya" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Kasb/Lavozim</label><input type="text" value={formData.personal.profession} onChange={(e) => handlePersonalChange('profession', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Frontend Developer" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={formData.personal.email} onChange={(e) => handlePersonalChange('email', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="email@example.com" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label><input type="tel" value={formData.personal.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+998 90 123 45 67" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Manzil</label><input type="text" value={formData.personal.address} onChange={(e) => handlePersonalChange('address', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Toshkent, O'zbekiston" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Qisqacha ma'lumot</label><textarea value={formData.personal.summary} onChange={(e) => handlePersonalChange('summary', e.target.value)} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="O'zingiz haqingizda qisqacha yozing..." /></div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <button onClick={addExperience} className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"><Plus size={20} />Ish tajribasi qo'shish</button>
                  {formData.experience.map((exp) => (
                    <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between items-center"><h3 className="font-semibold text-gray-700">Ish tajribasi</h3><button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button></div>
                      <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Lavozim" />
                      <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Kompaniya nomi" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" placeholder="Boshlanish (2020)" />
                        <input type="text" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tugash (2023)" />
                      </div>
                      <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Vazifalar va yutuqlar..." />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4">
                  <button onClick={addEducation} className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"><Plus size={20} />Ta'lim qo'shish</button>
                  {formData.education.map((edu) => (
                    <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between items-center"><h3 className="font-semibold text-gray-700">Ta'lim</h3><button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button></div>
                      <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Daraja/Yo'nalish" />
                      <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="O'quv muassasasi" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" placeholder="Boshlanish (2018)" />
                        <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tugash (2022)" />
                      </div>
                      <textarea value={edu.description} onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Qo'shimcha ma'lumot..." />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <button onClick={addSkill} className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"><Plus size={20} />Ko'nikma qo'shish</button>
                  {formData.skills.map((skill) => (
                    <div key={skill.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, 'name', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg mr-2" placeholder="Ko'nikma nomi (React, JavaScript...)" />
                        <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1"><span>Daraja</span><span>{skill.level}%</span></div>
                        <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateSkill(skill.id, 'level', e.target.value)} className="w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={saveData} className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-medium"><Save size={20} />Saqlash</button>
              <button onClick={generatePDF} className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-medium"><Download size={20} />PDF Yuklab olish</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 max-h-[800px] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Ko'rinish</h2>
              <button className="text-blue-500 hover:text-blue-700"><Eye size={20} /></button>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">{formData.personal.fullName || 'Ism Familiya'}</h1>
                <p className="text-xl text-gray-600 mb-3">{formData.personal.profession || 'Kasb'}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  {formData.personal.email && <p>📧 {formData.personal.email}</p>}
                  {formData.personal.phone && <p>📱 {formData.personal.phone}</p>}
                  {formData.personal.address && <p>📍 {formData.personal.address}</p>}
                </div>
              </div>
              {formData.personal.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-2 border-b border-gray-300 pb-1">QISQACHA MA'LUMOT</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{formData.personal.summary}</p>
                </div>
              )}
              {formData.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">ISH TAJRIBASI</h2>
                  <div className="space-y-4">
                    {formData.experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-blue-500 pl-4">
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-sm text-gray-600 mb-1">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        {exp.description && <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {formData.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">TA'LIM</h2>
                  <div className="space-y-4">
                    {formData.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-blue-500 pl-4">
                        <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-sm text-gray-600 mb-1">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                        {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {formData.skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">KO'NIKMALAR</h2>
                  <div className="space-y-3">
                    {formData.skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-600">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;