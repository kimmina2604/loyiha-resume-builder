import React, { useState } from 'react';
import { Eye, Edit3 } from 'lucide-react';

function ResumePreview({ formData }) {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-h-[800px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ko'rinish</h2>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="text-blue-500 hover:text-blue-700"
        >
          {previewMode ? <Edit3 size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg p-6 bg-white">
        {/* Sarlavha */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            {formData.personal.fullName || 'Ism Familiya'}
          </h1>
          <p className="text-xl text-gray-600 mb-3">
            {formData.personal.profession || 'Kasb'}
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            {formData.personal.email && <p>📧 {formData.personal.email}</p>}
            {formData.personal.phone && <p>📱 {formData.personal.phone}</p>}
            {formData.personal.address && <p>📍 {formData.personal.address}</p>}
          </div>
        </div>

        {/* Qisqacha ma'lumot */}
        {formData.personal.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-2 border-b border-gray-300 pb-1">
              QISQACHA MA'LUMOT
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {formData.personal.summary}
            </p>
          </div>
        )}

        {/* Ish tajribasi */}
        {formData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              ISH TAJRIBASI
            </h2>
            <div className="space-y-4">
              {formData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ta'lim */}
        {formData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              TA'LIM
            </h2>
            <div className="space-y-4">
              {formData.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {edu.institution} | {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ko'nikmalar */}
        {formData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">
              KO'NIKMALAR
            </h2>
            <div className="space-y-3">
              {formData.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;