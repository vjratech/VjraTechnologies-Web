
import { useMemo, useState } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

import { products } from '@/data/products';
import { ProductSiteFooter, ProductSiteHeader } from '@/components/products';

import './roi-calculator.css';

const GST_RATE = 18;
const OPERATING_DAYS = 30;
const VIZ_MARGIN = 2;
const TWO_WHEELER_KWH = 2.5;
const FOUR_WHEELER_KWH = 20;

type ChargerOption = {
  key: string;
  name: string;
  price: number;
};

type SelectedCharger = {
  key: string;
  quantity: number;
  price: number;
};


const chargerOptions: ChargerOption[] = products.flatMap((product) =>
  product.variants
    .filter((variant) => {
      // Include Wi-Fi socket variants.
      if (
        product.category === 'EV Charging Points' &&
        variant.connectivity === 'Wi-Fi'
      ) {
        return true;
      }

      // Include AC charger variants that explicitly support Wi-Fi.
      if (
        product.category === 'AC Chargers' &&
        variant.connectivity?.includes('Wi-Fi')
      ) {
        return true;
      }

      return false;
    })
    .map((variant) => ({
      key: `${product.id}::${variant.id}`,
      name: product.category === 'AC Chargers'
        ? `${product.cardName} — ${variant.name}`
        : product.cardName,
      price: variant.price ?? 0,
    }))
);


const optionMap = new Map(
  chargerOptions.map((option) => [option.key, option])
);

const defaultOption =
  chargerOptions.find(
    (option) =>
      option.key === 'single-point-6a::single-point-6a-wifi'
  ) ?? chargerOptions[0];

const money = (value: number, digits = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);

const numberFormat = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

function clamp(value: number, min: number, max: number) {
  return Math.min(
    max,
    Math.max(min, Number.isFinite(value) ? value : min)
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="vizroi-range-field">
      <div className="vizroi-range-top">
        <label>{label}</label>
        <output>{formatValue(value)}</output>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />

      <div className="vizroi-range-limits">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const [twoWheelers, setTwoWheelers] = useState(4);
  const [fourWheelers, setFourWheelers] = useState(1);

  const [customerRate, setCustomerRate] = useState(15);
  const [electricityRate, setElectricityRate] = useState(7.33);
  const [installationCost, setInstallationCost] = useState(0);

  const [selectedChargers, setSelectedChargers] = useState<
    SelectedCharger[]
  >(
    defaultOption
      ? [
          {
            key: defaultOption.key,
            quantity: 1,
            price: defaultOption.price,
          },
        ]
      : []
  );

  const [chargerChoice, setChargerChoice] = useState(
    defaultOption?.key ?? ''
  );
  const [chargerMenuOpen, setChargerMenuOpen] = useState(false);

  // Daily and monthly energy.
  const dailyKwh =
    twoWheelers * TWO_WHEELER_KWH +
    fourWheelers * FOUR_WHEELER_KWH;

  const monthlyKwh = dailyKwh * OPERATING_DAYS;

  // The customer charging rate includes GST.
  const dailyRevenue = dailyKwh * customerRate;
  const monthlyRevenue = dailyRevenue * OPERATING_DAYS;

  // Extract GST from the GST-inclusive customer revenue.
  const dailyTax =
    dailyRevenue * (GST_RATE / (100 + GST_RATE));

  const monthlyTax = dailyTax * OPERATING_DAYS;
  const monthlyElectricityCost = monthlyKwh * electricityRate;
  const monthlyVizMargin = monthlyKwh * VIZ_MARGIN;

  // Operator profit excludes GST, electricity cost and VIZ margin.
  const monthlyProfit =
    monthlyRevenue -
    monthlyTax -
    monthlyElectricityCost -
    monthlyVizMargin;

  const equipmentInvestment = useMemo(
    () =>
      selectedChargers.reduce(
        (total, charger) =>
          total + charger.price * charger.quantity,
        0
      ),
    [selectedChargers]
  );

  const totalInvestment =
    equipmentInvestment + installationCost;

  const roiMonths =
    monthlyProfit > 0 && totalInvestment > 0
      ? totalInvestment / monthlyProfit
      : null;

  function addCharger() {
    const option = optionMap.get(chargerChoice);
    if (!option) return;

    setSelectedChargers((current) => {
      const existing = current.find(
        (charger) => charger.key === option.key
      );

      if (existing) {
        return current.map((charger) =>
          charger.key === option.key
            ? {
                ...charger,
                quantity: Math.min(100, charger.quantity + 1),
              }
            : charger
        );
      }

      return [
        ...current,
        {
          key: option.key,
          quantity: 1,
          price: option.price,
        },
      ];
    });
  }

  function updateCharger(
    key: string,
    updates: Partial<SelectedCharger>
  ) {
    setSelectedChargers((current) =>
      current.map((charger) =>
        charger.key === key
          ? { ...charger, ...updates }
          : charger
      )
    );
  }

  return (
    <div className="vizroi-page">
      <ProductSiteHeader />

      <main className="vizroi-main">
        <div className="vizroi-shell">
          <header className="vizroi-heading">
            <h1>Charging ROI Calculator</h1>
          </header>

          <div className="vizroi-layout">
            <section className="vizroi-card vizroi-input-card">
              <div className="vizroi-section-head">
                <h2>Charging setup</h2>
              </div>

              <div className="vizroi-charger-select">
                <label htmlFor="vizroi-charger">
                  Add a charger
                </label>


                <div className="vizroi-charger-select-row">
                <div className="vizroi-custom-select">
                    <button
                    type="button"
                    className={`vizroi-select-trigger ${
                        chargerMenuOpen ? 'is-open' : ''
                    }`}
                    onClick={() => setChargerMenuOpen((open) => !open)}
                    aria-expanded={chargerMenuOpen}
                    aria-haspopup="listbox"
                    >
                    <span className="vizroi-select-current">
                        <span className="vizroi-select-name">
                        {optionMap.get(chargerChoice)?.name ?? 'Select a charger'}
                        </span>
                        <span className="vizroi-select-price">
                        {optionMap.has(chargerChoice)
                            ? money(optionMap.get(chargerChoice)!.price)
                            : ''}
                        </span>
                    </span>

                    <ChevronDown
                        size={18}
                        className={`vizroi-select-chevron ${
                        chargerMenuOpen ? 'is-open' : ''
                        }`}
                    />
                    </button>

                    {chargerMenuOpen && (
                    <>
                        <button
                        type="button"
                        className="vizroi-menu-backdrop"
                        aria-label="Close charger menu"
                        onClick={() => setChargerMenuOpen(false)}
                        />

                        <div className="vizroi-select-menu" role="listbox">
                        {chargerOptions.map((option) => (
                            <button
                            type="button"
                            role="option"
                            aria-selected={chargerChoice === option.key}
                            className={`vizroi-select-option ${
                                chargerChoice === option.key ? 'is-selected' : ''
                            }`}
                            key={option.key}
                            onClick={() => {
                                setChargerChoice(option.key);
                                setChargerMenuOpen(false);
                            }}
                            >
                            <span className="vizroi-option-copy">
                                <span className="vizroi-option-name">
                                {option.name}
                                </span>
                                <span className="vizroi-option-price">
                                {money(option.price)}
                                </span>
                            </span>

                            {chargerChoice === option.key && (
                                <span className="vizroi-option-check">✓</span>
                            )}
                            </button>
                        ))}
                        </div>
                    </>
                    )}
                </div>

                <button
                    type="button"
                    className="vizroi-add-button"
                    onClick={addCharger}
                    disabled={!chargerChoice}
                    aria-label="Add selected charger"
                >
                    <Plus size={17} />
                </button>
                </div>


                {selectedChargers.length > 0 && (
                  <div className="vizroi-selected-list">
                    {selectedChargers.map((charger) => {
                      const option = optionMap.get(charger.key);
                      if (!option) return null;

                      return (
                        <div
                          className="vizroi-selected-row"
                          key={charger.key}
                        >
                          <div className="vizroi-selected-name">
                            <span>{option.name}</span>
                            <small>
                              {money(charger.price)} each
                            </small>
                          </div>

                          <div className="vizroi-selected-controls">
                            <button
                              type="button"
                              onClick={() =>
                                updateCharger(charger.key, {
                                  quantity: Math.max(
                                    1,
                                    charger.quantity - 1
                                  ),
                                })
                              }
                              disabled={charger.quantity <= 1}
                              aria-label={`Remove one ${option.name}`}
                            >
                              −
                            </button>

                            <span>{charger.quantity}</span>

                            <button
                              type="button"
                              onClick={() =>
                                updateCharger(charger.key, {
                                  quantity: Math.min(
                                    100,
                                    charger.quantity + 1
                                  ),
                                })
                              }
                              disabled={charger.quantity >= 100}
                              aria-label={`Add one ${option.name}`}
                            >
                              +
                            </button>

                            <button
                              type="button"
                              className="vizroi-delete-button"
                              onClick={() =>
                                setSelectedChargers((current) =>
                                  current.filter(
                                    (item) =>
                                      item.key !== charger.key
                                  )
                                )
                              }
                              aria-label={`Remove ${option.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="vizroi-investment-line">
                <span>Charger investment</span>
                <strong>{money(equipmentInvestment)}</strong>
              </div>

              <div className="vizroi-section-divider" />

              <div className="vizroi-section-head">
                <h2>Estimated vehicle charging per day</h2>
              </div>

              <RangeField
                label="2-wheelers"
                value={twoWheelers}
                min={0}
                max={50}
                formatValue={numberFormat}
                onChange={(value) =>
                  setTwoWheelers(clamp(value, 0, 50))
                }
              />

              <RangeField
                label="4-wheelers"
                value={fourWheelers}
                min={0}
                max={20}
                formatValue={numberFormat}
                onChange={(value) =>
                  setFourWheelers(clamp(value, 0, 20))
                }
              />

              <details className="vizroi-assumptions">
                <summary>
                  <span>Assumptions &amp; rates</span>
                  <ChevronDown
                    size={17}
                    className="vizroi-chevron"
                  />
                </summary>

                <div className="vizroi-assumption-body">
                  <RangeField
                    label="Customer charging rate"
                    value={customerRate}
                    min={5}
                    max={40}
                    step={0.5}
                    formatValue={(value) =>
                      `${money(value, 2)} / kWh`
                    }
                    onChange={setCustomerRate}
                  />

                  <RangeField
                    label="Green meter electricity cost"
                    value={electricityRate}
                    min={0}
                    max={15}
                    step={0.01}
                    formatValue={(value) =>
                      `${money(value, 2)} / kWh`
                    }
                    onChange={setElectricityRate}
                  />

                  <div className="vizroi-fixed-line">
                    <span>VIZ margin (fixed)</span>
                    <strong>
                      {money(VIZ_MARGIN, 2)} / kWh
                    </strong>
                  </div>

                  <div className="vizroi-fixed-line">
                    <span>Taxes (GST 18%)</span>
                    <strong>
                      {money(
                        customerRate * GST_RATE / (100 + GST_RATE),
                        2
                      )} / kWh
                    </strong>
                  </div>

                  <div className="vizroi-installation-row">
                    <label htmlFor="vizroi-installation">
                      Installation cost
                    </label>

                    <div className="vizroi-amount-input">
                      <span>₹</span>
                      <input
                        id="vizroi-installation"
                        type="number"
                        min={0}
                        max={100000000}
                        step={500}
                        value={installationCost}
                        onChange={(event) =>
                          setInstallationCost(
                            clamp(
                              Number(event.target.value),
                              0,
                              100000000
                            )
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="vizroi-fixed-line">
                    <span>Operating days</span>
                    <strong>{OPERATING_DAYS} / month</strong>
                  </div>

                  <div className="vizroi-fixed-line">
                    <span>Energy per 2-wheeler</span>
                    <strong>
                      {numberFormat(TWO_WHEELER_KWH)} kWh / day
                    </strong>
                  </div>

                  <div className="vizroi-fixed-line">
                    <span>Energy per 4-wheeler</span>
                    <strong>
                      {numberFormat(FOUR_WHEELER_KWH)} kWh / day
                    </strong>
                  </div>
                </div>
              </details>
            </section>

            <section className="vizroi-results">
              <div className="vizroi-result-card vizroi-revenue-card">
                <span className="vizroi-result-title">
                  Daily revenue
                </span>

                <strong>{money(dailyRevenue)}</strong>

                <div className="vizroi-result-subrow">
                  <span>Monthly revenue</span>
                  <strong>{money(monthlyRevenue)}</strong>
                </div>
              </div>

              <div className="vizroi-result-card vizroi-profit-card">
                <span className="vizroi-result-title">
                  Monthly profit
                </span>

                <strong
                  className={
                    monthlyProfit < 0 ? 'is-negative' : ''
                  }
                >
                  {money(monthlyProfit)}
                </strong>
              </div>

              <div className="vizroi-result-card vizroi-roi-card">
                <span className="vizroi-result-title">
                  ROI break-even
                </span>

                <strong>
                  {totalInvestment <= 0
                    ? '—'
                    : monthlyProfit <= 0
                      ? 'Not profitable'
                      : `${numberFormat(roiMonths ?? 0)} months`}
                </strong>

                <div className="vizroi-result-subrow">
                  <span>Total investment</span>
                  <strong>{money(totalInvestment)}</strong>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <ProductSiteFooter />
    </div>
  );
}
