import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    ChevronLeft,
    Upload,
    Camera,
    File,
    ChevronDown,
    Check,
    X,
    AlertCircle,
    CheckCircle,
    Phone,
    Mail,
    Calendar,
    User,
    FileText
} from "lucide-react";

function NewClaim() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [formData, setFormData] = useState({
        claimType: '',
        incidentDate: '',
        description: '',
        contactPhone: '',
        contactEmail: '',
        claimAmount: ''
    });
    const [checkedDocs, setCheckedDocs] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const policies = [
        { id: 'health', name: t('claim.healthInsurance') || 'Family Health Protection Plan' },
        { id: 'crop', name: t('claim.cropInsurance') || 'Crop Insurance Plan' },
        { id: 'livestock', name: t('claim.livestockInsurance') || 'Livestock Coverage Plan' },
        { id: 'life', name: t('claim.lifeInsurance') || 'Life Insurance Plan' }
    ];

    const getRequiredDocs = () => {
        const docs = {
            health: [
                t('claim.docs.idProof') || "Government-issued ID proof (Aadhaar/Voter ID)",
                t('claim.docs.policyDoc') || "Policy document copy",
                t('claim.docs.medicalBills') || "Medical bills and receipts",
                t('claim.docs.hospitalRecords') || "Hospital discharge summary"
            ],
            crop: [
                t('claim.docs.idProof') || "Government-issued ID proof (Aadhaar/Voter ID)",
                t('claim.docs.policyDoc') || "Policy document copy",
                t('claim.docs.landRecords') || "Land records and ownership documents",
                t('claim.docs.cropLoss') || "Crop loss assessment report"
            ],
            livestock: [
                t('claim.docs.idProof') || "Government-issued ID proof (Aadhaar/Voter ID)",
                t('claim.docs.policyDoc') || "Policy document copy",
                t('claim.docs.veterinary') || "Veterinary certificate",
                t('claim.docs.livestockProof') || "Livestock ownership proof"
            ],
            life: [
                t('claim.docs.idProof') || "Government-issued ID proof (Aadhaar/Voter ID)",
                t('claim.docs.policyDoc') || "Policy document copy",
                t('claim.docs.deathCert') || "Death certificate",
                t('claim.docs.postmortem') || "Post-mortem report (if applicable)"
            ]
        };
        return docs[selectedPolicy] || docs.health;
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            file: file
        }));
        setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    };

    const handleDocCheck = (index) => {
        setCheckedDocs(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const canProceedToStep2 = () => {
        return selectedPolicy && Object.keys(checkedDocs).length >= 3;
    };

    const canProceedToStep3 = () => {
        return uploadedFiles.length >= 2;
    };

    const canSubmitClaim = () => {
        return formData.claimType && formData.incidentDate && formData.description && 
               formData.contactPhone && formData.contactEmail;
    };

    const handleSubmit = async () => {
        if (!canSubmitClaim()) return;
        
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert(t('claim.submitSuccess') || 'Claim submitted successfully! Reference ID: CLM' + Date.now());
            navigate('/claim/track');
        }, 2000);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* HEADER */}
            <div className="bg-white border-b px-4 py-4 flex items-center sticky top-0 z-50 pr-20">
                <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="text-gray-600" size={24} />
                </button>
                <h1 className="flex-1 text-center font-bold text-gray-800 text-lg mr-8">
                    {t('claim.title') || 'File New Claim'}
                </h1>
            </div>

            {/* PROGRESS INDICATOR */}
            <div className="bg-white border-b px-4 py-3">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {currentStep > step ? <Check size={16} /> : step}
                            </div>
                            {step < 3 && (
                                <div className={`w-16 h-1 mx-2 ${
                                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-3xl mx-auto w-full p-4 space-y-6">

                {/* STEP 1: POLICY SELECTION & DOCUMENTS */}
                {currentStep === 1 && (
                    <>
                        {/* POLICY DROPDOWN */}
                        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">{t('claim.selectPolicy') || 'Select Insurance Policy'}</h3>
                            <div className="relative inline-block text-left w-full">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center justify-between w-full gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 outline-none"
                                >
                                    {selectedPolicy ? policies.find(p => p.id === selectedPolicy)?.name : (t('claim.choosePolicyPlaceholder') || 'Choose your policy')}
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                                        {policies.map((policy) => (
                                            <button
                                                key={policy.id}
                                                onClick={() => { setSelectedPolicy(policy.id); setIsDropdownOpen(false); }}
                                                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 font-medium text-gray-700 border-b last:border-0"
                                            >
                                                {policy.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* REQUIRED DOCUMENTS */}
                        {selectedPolicy && (
                            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm space-y-6">
                                <h3 className="font-bold text-gray-900">{t('claim.requiredDocs') || 'Required Documents'}</h3>
                                <div className="space-y-4">
                                    {getRequiredDocs().map((doc, index) => (
                                        <label key={index} className="flex items-start gap-3 group cursor-pointer">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedDocs[index] || false}
                                                    onChange={() => handleDocCheck(index)}
                                                    className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                                />
                                                <Check className="absolute w-3.5 h-3.5 text-white left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium leading-tight group-hover:text-gray-900">
                                                {doc}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    disabled={!canProceedToStep2()}
                                    className={`w-full py-4 rounded-2xl font-bold shadow-md transition-all ${
                                        canProceedToStep2() 
                                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {t('claim.continueToUpload') || 'Continue to Upload Documents'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* STEP 2: UPLOAD DOCUMENTS */}
                {currentStep === 2 && (
                    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900">{t('claim.uploadDocs') || 'Upload Documents'}</h3>

                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                            <Upload size={40} className="text-gray-400" />
                            <div className="space-y-1">
                                <p className="font-bold text-gray-900">{t('claim.uploadTitle') || 'Upload your documents'}</p>
                                <p className="text-sm text-gray-400 font-medium">{t('claim.uploadSubtitle') || 'Click to browse or drag and drop'}</p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <label className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">
                                    <Camera size={18} />
                                    {t('claim.takePhoto') || 'Take Photo'}
                                    <input type="file" accept="image/*" capture="camera" onChange={handleFileUpload} className="hidden" />
                                </label>
                                <label className="flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">
                                    <File size={18} />
                                    {t('claim.chooseFile') || 'Choose File'}
                                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* UPLOADED FILES */}
                        {uploadedFiles.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-800">{t('claim.uploadedFiles') || 'Uploaded Files'}</h4>
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-blue-600" size={20} />
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{file.name}</p>
                                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFile(file.id)}
                                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                        >
                                            <X size={16} className="text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                            >
                                {t('common.back') || 'Back'}
                            </button>
                            <button
                                onClick={() => setCurrentStep(3)}
                                disabled={!canProceedToStep3()}
                                className={`flex-1 py-4 rounded-2xl font-bold shadow-md transition-all ${
                                    canProceedToStep3() 
                                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {t('claim.continueToDetails') || 'Continue to Claim Details'}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: CLAIM DETAILS */}
                {currentStep === 3 && (
                    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900">{t('claim.claimDetails') || 'Claim Details'}</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('claim.claimType') || 'Type of Claim'}
                                </label>
                                <select
                                    value={formData.claimType}
                                    onChange={(e) => setFormData(prev => ({ ...prev, claimType: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">{t('claim.selectClaimType') || 'Select claim type'}</option>
                                    <option value="medical">{t('claim.types.medical') || 'Medical Treatment'}</option>
                                    <option value="accident">{t('claim.types.accident') || 'Accident'}</option>
                                    <option value="crop_damage">{t('claim.types.cropDamage') || 'Crop Damage'}</option>
                                    <option value="livestock_death">{t('claim.types.livestockDeath') || 'Livestock Death'}</option>
                                    <option value="death">{t('claim.types.death') || 'Death Claim'}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('claim.incidentDate') || 'Date of Incident'}
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                                    <input
                                        type="date"
                                        value={formData.incidentDate}
                                        onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('claim.description') || 'Description of Incident'}
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder={t('claim.descriptionPlaceholder') || 'Please describe what happened in detail...'}
                                    rows={4}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('claim.claimAmount') || 'Estimated Claim Amount (₹)'}
                                </label>
                                <input
                                    type="number"
                                    value={formData.claimAmount}
                                    onChange={(e) => setFormData(prev => ({ ...prev, claimAmount: e.target.value }))}
                                    placeholder="50000"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('claim.contactPhone') || 'Contact Phone'}
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            value={formData.contactPhone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                                            placeholder="+91 98765 43210"
                                            className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        {t('claim.contactEmail') || 'Contact Email'}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={formData.contactEmail}
                                            onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                                            placeholder="your@email.com"
                                            className="w-full border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                            >
                                {t('common.back') || 'Back'}
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!canSubmitClaim() || isSubmitting}
                                className={`flex-1 py-4 rounded-2xl font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                                    canSubmitClaim() && !isSubmitting
                                        ? 'bg-green-600 text-white hover:bg-green-700' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        {t('claim.submitting') || 'Submitting...'}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={20} />
                                        {t('claim.submitClaim') || 'Submit Claim'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewClaim;