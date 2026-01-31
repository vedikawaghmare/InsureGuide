const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const isValidPhone = (phone) => {
    return phone && /^\d{10}$/.test(phone);
};

module.exports = { generateOtp, isValidPhone };
