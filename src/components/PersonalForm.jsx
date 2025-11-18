import React from 'react';

function PersonalInfoForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To'liq ism
        </label>
        <input
          type="text"
          value={formData.personal.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ism Familiya"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kasb/Lavozim
        </label>
        <input
          type="text"
          value={formData.personal.profession}
          onChange={(e) => handleChange('profession', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Frontend Developer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.personal.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <input
          type="tel"
          value={formData.personal.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+998 90 123 45 67"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Manzil
        </label>
        <input
          type="text"
          value={formData.personal.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Toshkent, O'zbekiston"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Qisqacha ma'lumot
        </label>
        <textarea
          value={formData.personal.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="O'zingiz haqingizda qisqacha yozing..."
        />
      </div>
    </div>
  );
}

export default PersonalInfoForm;