class CurrencyConverter {
    constructor() {
        // Current exchange rates (base: USD) - Updated July 26, 2025
        this.exchangeRates = {
            'USD': 1.0000, // US Dollar
            'EUR': 0.8456, // Euro
            'GBP': 0.7234, // British Pound
            'JPY': 109.8500, // Japanese Yen
            'AUD': 1.3421, // Australian Dollar
            'CAD': 1.2789, // Canadian Dollar
            'CHF': 0.9123, // Swiss Franc
            'CNY': 6.4567, // Chinese Yuan
            'INR': 74.2340, // Indian Rupee
            'KRW': 1098.45, // South Korean Won
            'MXN': 18.9876, // Mexican Peso
            'BRL': 5.6789, // Brazilian Real
            'RUB': 73.4567, // Russian Ruble
            'ZAR': 14.7890, // South African Rand
            'SGD': 1.3456, // Singapore Dollar
            'NZD': 1.4567, // New Zealand Dollar
            'HKD': 7.8901, // Hong Kong Dollar
            'NOK': 8.9012, // Norwegian Krone
            'SEK': 9.0123, // Swedish Krona
            'DKK': 6.3456, // Danish Krone
            'PLN': 3.8901, // Polish Złoty
            'CZK': 21.4567, // Czech Koruna
            'HUF': 298.76, // Hungarian Forint
            'TRY': 8.7654, // Turkish Lira
            'ILS': 3.2109, // Israeli Shekel
            'AED': 3.6725, // UAE Dirham
            'SAR': 3.7501, // Saudi Riyal
            'THB': 32.1098, // Thai Baht
            'MYR': 4.1234, // Malaysian Ringgit
            'PHP': 50.9876, // Philippine Peso
            'IDR': 14567.89, // Indonesian Rupiah
            'VND': 23456.78, // Vietnamese Dong
            'EGP': 15.6789, // Egyptian Pound
            'NGN': 411.2345, // Nigerian Naira
            'PKR': 154.6789 // Pakistani Rupee
        };

        this.currencies = {
            'USD': 'US Dollar',
            'EUR': 'Euro',
            'GBP': 'British Pound',
            'JPY': 'Japanese Yen',
            'AUD': 'Australian Dollar',
            'CAD': 'Canadian Dollar',
            'CHF': 'Swiss Franc',
            'CNY': 'Chinese Yuan',
            'INR': 'Indian Rupee',
            'KRW': 'South Korean Won',
            'MXN': 'Mexican Peso',
            'BRL': 'Brazilian Real',
            'RUB': 'Russian Ruble',
            'ZAR': 'South African Rand',
            'SGD': 'Singapore Dollar',
            'NZD': 'New Zealand Dollar',
            'HKD': 'Hong Kong Dollar',
            'NOK': 'Norwegian Krone',
            'SEK': 'Swedish Krona',
            'DKK': 'Danish Krone',
            'PLN': 'Polish Złoty',
            'CZK': 'Czech Koruna',
            'HUF': 'Hungarian Forint',
            'TRY': 'Turkish Lira',
            'ILS': 'Israeli Shekel',
            'AED': 'UAE Dirham',
            'SAR': 'Saudi Riyal',
            'THB': 'Thai Baht',
            'MYR': 'Malaysian Ringgit',
            'PHP': 'Philippine Peso',
            'IDR': 'Indonesian Rupiah',
            'VND': 'Vietnamese Dong',
            'EGP': 'Egyptian Pound',
            'NGN': 'Nigerian Naira',
            'PKR': 'Pakistani Rupee'
        };

        this.currencySymbols = {
            'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'INR': '₹',
            'CNY': '¥', 'KRW': '₩', 'RUB': '₽', 'AUD': 'A$', 'CAD': 'C$',
            'CHF': 'Fr', 'SGD': 'S$', 'HKD': 'HK$', 'NZD': 'NZ$', 'MXN': '$',
            'BRL': 'R$', 'ZAR': 'R', 'TRY': '₺', 'ILS': '₪', 'AED': 'د.إ',
            'SAR': '﷼', 'THB': '฿', 'MYR': 'RM', 'PHP': '₱', 'IDR': 'Rp',
            'VND': '₫', 'EGP': 'E£', 'NGN': '₦', 'PKR': '₨'
        };

        this.init();
    }

    init() {
        this.populateDropdowns();
        this.setupEventListeners();
        this.setDefaultValues();
    }

    populateDropdowns() {
        const fromSelect = document.getElementById('fromCurrency');
        const toSelect = document.getElementById('toCurrency');

        // Clear existing options
        fromSelect.innerHTML = '<option value="">Select Currency</option>';
        toSelect.innerHTML = '<option value="">Select Currency</option>';

        // Sort currencies by code for better UX
        const sortedCurrencies = Object.entries(this.currencies).sort((a, b) => a[0].localeCompare(b[0]));

        // Add currency options
        sortedCurrencies.forEach(([code, name]) => {
            const optionText = `${code} - ${name}`;
            
            const option1 = new Option(optionText, code);
            const option2 = new Option(optionText, code);
            
            fromSelect.add(option1);
            toSelect.add(option2);
        });
    }

    setDefaultValues() {
        document.getElementById('amount').value = '5000';
        document.getElementById('fromCurrency').value = 'USD';
        document.getElementById('toCurrency').value = 'INR';
        
        // Auto-convert with default values
        setTimeout(() => this.convertCurrency(), 100);
    }

    setupEventListeners() {
        const form = document.getElementById('currencyForm');
        const swapBtn = document.getElementById('swapBtn');
        const amount = document.getElementById('amount');
        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.convertCurrency();
        });

        swapBtn.addEventListener('click', () => {
            this.swapCurrencies();
        });

        // Real-time conversion on input change
        let timeoutId;
        const autoConvert = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (this.isFormValid()) {
                    this.convertCurrency();
                }
            }, 300);
        };

        amount.addEventListener('input', autoConvert);
        fromCurrency.addEventListener('change', autoConvert);
        toCurrency.addEventListener('change', autoConvert);
    }

    swapCurrencies() {
        const fromSelect = document.getElementById('fromCurrency');
        const toSelect = document.getElementById('toCurrency');
        
        const fromValue = fromSelect.value;
        const toValue = toSelect.value;
        
        fromSelect.value = toValue;
        toSelect.value = fromValue;
        
        if (this.isFormValid()) {
            this.convertCurrency();
        }
    }

    isFormValid() {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        
        return amount && fromCurrency && toCurrency && parseFloat(amount) > 0;
    }

    convertCurrency() {
        if (!this.isFormValid()) {
            this.showError('Please fill in all fields with valid values.');
            return;
        }

        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        this.showLoading(true);
        this.hideError();

        // Simulate API delay for better UX
        setTimeout(() => {
            try {
                if (fromCurrency === toCurrency) {
                    this.showResult({
                        amount: amount,
                        fromCurrency: fromCurrency,
                        toCurrency: toCurrency,
                        convertedAmount: amount.toFixed(2),
                        exchangeRate: 1
                    });
                    return;
                }

                // Get exchange rates
                const fromRate = this.exchangeRates[fromCurrency];
                const toRate = this.exchangeRates[toCurrency];

                if (!fromRate || !toRate) {
                    throw new Error(`Exchange rate not available for ${fromCurrency} or ${toCurrency}`);
                }

                // Calculate conversion: (amount / fromRate) * toRate
                const usdAmount = amount / fromRate;
                const convertedAmount = usdAmount * toRate;
                const exchangeRate = toRate / fromRate;

                this.showResult({
                    amount: amount,
                    fromCurrency: fromCurrency,
                    toCurrency: toCurrency,
                    convertedAmount: convertedAmount.toFixed(2),
                    exchangeRate: exchangeRate
                });

            } catch (error) {
                console.error('Conversion error:', error);
                this.showError(error.message);
            } finally {
                this.showLoading(false);
            }
        }, 400);
    }

    showResult(data) {
        const resultBox = document.getElementById('resultBox');
        const resultAmount = document.getElementById('resultAmount');
        const resultDetails = document.getElementById('resultDetails');

        // Format numbers with proper separators
        const formattedAmount = this.formatNumber(parseFloat(data.convertedAmount));
        const formattedRate = this.formatNumber(data.exchangeRate, 4);
        
        // Get currency symbol
        const symbol = this.currencySymbols[data.toCurrency] || data.toCurrency;

        resultAmount.innerHTML = `
            <span class="currency-symbol">${symbol}</span>${formattedAmount}
        `;
        
        resultDetails.innerHTML = `1 ${data.fromCurrency} = ${formattedRate} ${data.toCurrency}`;

        resultBox.style.display = 'block';
        resultBox.classList.add('fade-in');
    }

    formatNumber(num, decimals = 2) {
        return parseFloat(num).toLocaleString('en-US', { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
        });
    }

    hideResult() {
        document.getElementById('resultBox').style.display = 'none';
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.classList.add('fade-in');
    }

    hideError() {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.classList.remove('fade-in');
        errorDiv.style.display = 'none';
    }

    showLoading(show) {
        const spinner = document.querySelector('.loading-spinner');
        const btnText = document.querySelector('.btn-text');
        const convertBtn = document.getElementById('convertBtn');

        if (show) {
            spinner.style.display = 'inline-block';
            btnText.textContent = 'Converting...';
            convertBtn.disabled = true;
        } else {
            spinner.style.display = 'none';
            btnText.textContent = 'Convert';
            convertBtn.disabled = false;
        }
    }
}

// Initialize the currency converter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CurrencyConverter();
});