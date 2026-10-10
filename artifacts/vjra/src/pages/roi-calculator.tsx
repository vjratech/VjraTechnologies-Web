
import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleHelp,
  Plus,
  Settings2,
  Trash2,
  X,
  Zap,
} from 'lucide-react';

import { products } from '@/data/products';
import { ProductSiteFooter, ProductSiteHeader } from '@/components/products';

import './roi-calculator.css';

const GST_RATE = 18;
const OPERATING_DAYS = 30;
const VIZ_MARGIN = 2;

type ChargerOption = {
  key: string;
  name: string;
  variantName: string;
  power: string;
  price: number;
  image: string;
};

type Charger = {
  key: string;
  quantity: number;
  price: number;
};

const chargerOptions: ChargerOption[] = products.flatMap((product) =>
  product.variants
    .filter((variant) => variant.connectivity === 'Wi-Fi')
    .map((variant) => ({
      key: `${product.id}::${variant.id}`,
      name: product.cardName,
      variantName: variant.name,
      power: variant.power ?? product.subtitle,
      price: variant.price ?? 0,
      image: product.image,
    })),
);

const optionMap = new Map(
  chargerOptions.map((option) => [option.key, option]),
);

const defaultOption =
  chargerOptions.find(
    (option) =>
      option.key === 'single-point-6a::single-point-6a-wifi',
  ) ?? chargerOptions[0];

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const rupees = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function Stepper({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  const decrease = () => onChange(clamp(value - step, min, max));
  const increase = () => onChange(clamp(value + step, min, max));

  return (
    <div className="vizroi-stepper">
      <div className="vizroi-stepper-copy">
        <span>{label}</span>
        <small>{suffix}</small>
      </div>

      <div className="vizroi-stepper-control">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>

        <strong>{rupees(value)}</strong>

        <button
          type="button"
          onClick={increase}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function RoiCalculator() {
  const [sessionsPerDay, setSessionsPerDay] = useState(6);
  const [kwhPerSession, setKwhPerSession] = useState(2.5);

  const [customerRate, setCustomerRate] = useState(15);
  const [electricityRate, setElectricityRate] = useState(7.33);
  const [installationCost, setInstallationCost] = useState(0);

  const [chargers, setChargers] = useState<Charger[]>(
    defaultOption
      ? [
          {
            key: defaultOption.key,
            quantity: 1,
            price: defaultOption.price,
          },
        ]
      : [],
  );

  const [showChargerSetup, setShowChargerSetup] = useState(false);
  const [newChargerKey, setNewChargerKey] = useState(
    defaultOption?.key ?? '',
  );

  const totalKwhPerDay = sessionsPerDay * kwhPerSession;
  const totalKwhPerMonth = totalKwhPerDay * OPERATING_DAYS;

  // Customer tariff is GST-inclusive. Extract GST from the total.
  const dailyRevenue = totalKwhPerDay * customerRate;
  const monthlyRevenue = dailyRevenue * OPERATING_DAYS;
  const dailyGst = dailyRevenue * (GST_RATE / (100 + GST_RATE));
  const monthlyGst = dailyGst * OPERATING_DAYS;

  const dailyElectricityCost = totalKwhPerDay * electricityRate;
  const monthlyElectricityCost =
    dailyElectricityCost * OPERATING_DAYS;

  const dailyVizCost = totalKwhPerDay * VIZ_MARGIN;
  const monthlyVizCost = dailyVizCost * OPERATING_DAYS;

  const dailyProfit =
    dailyRevenue - dailyGst - dailyElectricityCost - dailyVizCost;

  const monthlyProfit = dailyProfit * OPERATING_DAYS;

  const equipmentCost = useMemo(
    () =>
      chargers.reduce(
        (sum, charger) => sum + charger.price * charger.quantity,
        0,
      ),
    [chargers],
  );

  const totalInvestment = equipmentCost + installationCost;

  const paybackMonths =
    monthlyProfit > 0 && totalInvestment > 0
      ? totalInvestment / monthlyProfit
      : null;

  const paybackLabel =
    totalInvestment <= 0
      ? 'No upfront investment'
      : monthlyProfit <= 0
        ? 'Not profitable yet'
        : paybackMonths !== null
          ? `${rupees(paybackMonths)} months`
          : '—';

  function addCharger() {
    const option = optionMap.get(newChargerKey);
    if (!option) return;

    setChargers((current) => {
      const existing = current.find((item) => item.key === option.key);

      if (existing) {
        return current.map((item) =>
          item.key === option.key
            ? { ...item, quantity: item.quantity + 1 }
            : item,
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

  function updateCharger(key: string, updates: Partial<Charger>) {
    setChargers((current) =>
      current.map((item) =>
        item.key === key ? { ...item, ...updates } : item,
      ),
    );
  }

  function resetCalculator() {
    setSessionsPerDay(6);
    setKwhPerSession(2.5);
    setCustomerRate(15);
    setElectricityRate(7.33);
    setInstallationCost(0);
    setChargers(
      defaultOption
        ? [{ key: defaultOption.key, quantity: 1, price: defaultOption.price }]
        : [],
    );
    setNewChargerKey(defaultOption?.key ?? '');
    setShowChargerSetup(false);
  }

  return (
    <div className="vizroi-page">
      <ProductSiteHeader />

      <main className="vizroi-main">
        <div className="vizroi-shell">
          <header className="vizroi-heading">
            <div className="vizroi-eyebrow">
              <Zap size={14} />
              VIZ SMART CHARGING
            </div>

            <h1>
              See how much your
              <span> charger could earn.</span>
            </h1>

            <p>
              Choose your charging activity and see your estimated earnings,
              profit and break-even time.
            </p>
          </header>

          <div className="vizroi-layout">
            {/* INPUT SIDE */}
            <section className="vizroi-card vizroi-input-card">
              <div className="vizroi-card-title">
                <div className="vizroi-icon-box">
                  <Settings2 size={19} />
                </div>

                <div>
                  <h2>Your charging setup</h2>
                  <p>Start with one charger. Change any value.</p>
                </div>
              </div>

              <div className="vizroi-device">
                <div className="vizroi-device-image">
                  {defaultOption && (
                    <img src={defaultOption.image} alt="VIZ Single Point 6A" />
                  )}
                </div>

                <div className="vizroi-device-copy">
                  <span className="vizroi-device-label">YOUR CHARGER</span>
                  <strong>Single Point — 6A</strong>
                  <span>Wi-Fi · 1.3 kW</span>
                  <button
                    type="button"
                    className="vizroi-text-button"
                    onClick={() => setShowChargerSetup((shown) => !shown)}
                  >
                    {showChargerSetup ? 'Close setup' : 'Add or edit chargers'}
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {showChargerSetup && (
                <div className="vizroi-setup-panel">
                  <div className="vizroi-setup-heading">
                    <div>
                      <strong>Charger configuration</strong>
                      <p>Add devices or change the equipment price.</p>
                    </div>

                    <button
                      type="button"
                      className="vizroi-close-button"
                      onClick={() => setShowChargerSetup(false)}
                      aria-label="Close charger configuration"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <label className="vizroi-field-label" htmlFor="vizroi-charger-select">
                    Choose a Wi-Fi charger
                  </label>

                  <div className="vizroi-select-row">
                    <select
                      id="vizroi-charger-select"
                      value={newChargerKey}
                      onChange={(event) => setNewChargerKey(event.target.value)}
                    >
                      {chargerOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.name} · {option.variantName}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="vizroi-add-button"
                      onClick={addCharger}
                      disabled={!newChargerKey}
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>

                  <div className="vizroi-charger-list">
                    {chargers.map((charger) => {
                      const option = optionMap.get(charger.key);
                      if (!option) return null;

                      return (
                        <div className="vizroi-charger-row" key={charger.key}>
                          <div className="vizroi-charger-row-title">
                            <div>
                              <strong>{option.name}</strong>
                              <small>{option.variantName}</small>
                            </div>

                            <button
                              type="button"
                              className="vizroi-remove-button"
                              onClick={() =>
                                setChargers((current) =>
                                  current.filter((item) => item.key !== charger.key),
                                )
                              }
                              aria-label={`Remove ${option.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="vizroi-charger-edit-grid">
                            <label>
                              Quantity
                              <input
                                type="number"
                                min={1}
                                max={100}
                                value={charger.quantity}
                                onChange={(event) =>
                                  updateCharger(charger.key, {
                                    quantity: Math.round(
                                      clamp(Number(event.target.value), 1, 100),
                                    ),
                                  })
                                }
                              />
                            </label>

                            <label>
                              Equipment price (₹)
                              <input
                                type="number"
                                min={0}
                                value={charger.price}
                                onChange={(event) =>
                                  updateCharger(charger.key, {
                                    price: clamp(
                                      Number(event.target.value),
                                      0,
                                      100000000,
                                    ),
                                  })
                                }
                              />
                            </label>

                            <div className="vizroi-line-total">
                              <span>Total</span>
                              <strong>{money(charger.price * charger.quantity)}</strong>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {chargers.length === 0 && (
                      <p className="vizroi-empty">
                        No chargers selected. Add a charger to calculate payback.
                      </p>
                    )}
                  </div>

                  <div className="vizroi-equipment-total">
                    <span>Equipment total</span>
                    <strong>{money(equipmentCost)}</strong>
                  </div>
                </div>
              )}

              <div className="vizroi-divider" />

              <div className="vizroi-section-label">
                <span>How busy is your location?</span>
                <span className="vizroi-live-tag">LIVE ESTIMATE</span>
              </div>

              <div className="vizroi-usage-summary">
                <div>
                  <strong>{sessionsPerDay}</strong>
                  <span>charging sessions / day</span>
                </div>

                <div className="vizroi-usage-dot" />

                <div>
                  <strong>{rupees(kwhPerSession)}</strong>
                  <span>kWh per session</span>
                </div>
              </div>

              <Stepper
                label="Charging sessions"
                value={sessionsPerDay}
                min={0}
                max={100}
                suffix="sessions per day"
                onChange={setSessionsPerDay}
              />

              <Stepper
                label="Energy per session"
                value={kwhPerSession}
                min={0.5}
                max={100}
                step={0.5}
                suffix="kWh per vehicle"
                onChange={setKwhPerSession}
              />

              <div className="vizroi-energy-note">
                <Zap size={15} />
                <span>
                  You could sell about <strong>{rupees(totalKwhPerDay)} kWh/day</strong>
                  {' '}or <strong>{rupees(totalKwhPerMonth)} kWh/month</strong>.
                </span>
              </div>

              <details className="vizroi-disclosure">
                <summary>
                  <span>
                    <Settings2 size={16} />
                    Assumptions & rates
                  </span>
                  <ChevronDown size={17} className="vizroi-chevron" />
                </summary>

                <div className="vizroi-disclosure-body">
                  <div className="vizroi-edit-field">
                    <label htmlFor="vizroi-customer-rate">
                      Customer charging rate
                      <small>Price paid by the customer, including GST</small>
                    </label>
                    <div className="vizroi-input-with-unit">
                      <span>₹</span>
                      <input
                        id="vizroi-customer-rate"
                        type="number"
                        min={0}
                        step={0.5}
                        value={customerRate}
                        onChange={(event) =>
                          setCustomerRate(clamp(Number(event.target.value), 0, 100000))
                        }
                      />
                      <small>/kWh</small>
                    </div>
                  </div>

                  <div className="vizroi-edit-field">
                    <label htmlFor="vizroi-electricity-rate">
                      Green meter electricity cost
                      <small>Amount paid for electricity</small>
                    </label>
                    <div className="vizroi-input-with-unit">
                      <span>₹</span>
                      <input
                        id="vizroi-electricity-rate"
                        type="number"
                        min={0}
                        step={0.01}
                        value={electricityRate}
                        onChange={(event) =>
                          setElectricityRate(
                            clamp(Number(event.target.value), 0, 100000),
                          )
                        }
                      />
                      <small>/kWh</small>
                    </div>
                  </div>

                  <div className="vizroi-edit-field">
                    <label htmlFor="vizroi-installation">
                      Installation & setup
                      <small>Optional; equipment cost is separate</small>
                    </label>
                    <div className="vizroi-input-with-unit">
                      <span>₹</span>
                      <input
                        id="vizroi-installation"
                        type="number"
                        min={0}
                        step={500}
                        value={installationCost}
                        onChange={(event) =>
                          setInstallationCost(
                            clamp(Number(event.target.value), 0, 100000000),
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="vizroi-fixed-rates">
                    <div>
                      <span>GST</span>
                      <strong>{GST_RATE}%</strong>
                    </div>
                    <div>
                      <span>VIZ margin</span>
                      <strong>₹{VIZ_MARGIN.toFixed(2)}/kWh</strong>
                    </div>
                    <div>
                      <span>Operating days</span>
                      <strong>{OPERATING_DAYS}/month</strong>
                    </div>
                  </div>
                </div>
              </details>

              <button
                type="button"
                className="vizroi-reset"
                onClick={resetCalculator}
              >
                Reset calculator
              </button>
            </section>

            {/* RESULTS SIDE */}
            <section className="vizroi-results">
              <div className="vizroi-results-heading">
                <div>
                  <div className="vizroi-eyebrow">
                    <Zap size={13} />
                    YOUR ESTIMATED RETURNS
                  </div>
                  <h2>Your charger, earning for you.</h2>
                  <p>Based on your daily charging activity.</p>
                </div>
              </div>

              <div className="vizroi-hero-result">
                <div className="vizroi-result-label">
                  <span>Estimated monthly revenue</span>
                  <CircleHelp size={15} />
                </div>

                <div className="vizroi-hero-amount">{money(monthlyRevenue)}</div>

                <div className="vizroi-result-caption">
                  Customer collections, including GST
                </div>

                <div className="vizroi-result-footer">
                  <span>Daily revenue</span>
                  <strong>{money(dailyRevenue)}</strong>
                </div>
              </div>

              <div className="vizroi-profit-grid">
                <div className="vizroi-profit-card">
                  <div className="vizroi-profit-icon">
                    <ArrowUpRight size={17} />
                  </div>
                  <span>Monthly operator profit</span>
                  <strong className={monthlyProfit < 0 ? 'is-negative' : ''}>
                    {money(monthlyProfit)}
                  </strong>
                  <small>{money(dailyProfit)} per day</small>
                </div>

                <div className="vizroi-profit-card vizroi-payback-tile">
                  <div className="vizroi-profit-icon">
                    <Check size={17} />
                  </div>
                  <span>Investment break-even</span>
                  <strong>{paybackLabel}</strong>
                  <small>
                    Investment: {money(totalInvestment)}
                  </small>
                </div>
              </div>

              <details className="vizroi-disclosure vizroi-cost-disclosure">
                <summary>
                  <span>
                    <Settings2 size={16} />
                    See monthly cost breakdown
                  </span>
                  <ChevronDown size={17} className="vizroi-chevron" />
                </summary>

                <div className="vizroi-disclosure-body">
                  <div className="vizroi-breakdown-row">
                    <span>Customer revenue (incl. GST)</span>
                    <strong>{money(monthlyRevenue)}</strong>
                  </div>
                  <div className="vizroi-breakdown-row">
                    <span>GST included in revenue</span>
                    <strong>− {money(monthlyGst)}</strong>
                  </div>
                  <div className="vizroi-breakdown-row">
                    <span>Electricity cost</span>
                    <strong>− {money(monthlyElectricityCost)}</strong>
                  </div>
                  <div className="vizroi-breakdown-row">
                    <span>VIZ margin</span>
                    <strong>− {money(monthlyVizCost)}</strong>
                  </div>
                  <div className="vizroi-breakdown-row vizroi-breakdown-final">
                    <span>Operator profit</span>
                    <strong>{money(monthlyProfit)}</strong>
                  </div>
                </div>
              </details>

              <div className="vizroi-result-note">
                <Check size={15} />
                <p>
                  Your estimate updates instantly when you change your usage or rates.
                  Actual results depend on site usage and operating costs.
                </p>
              </div>

              <div className="vizroi-annual-note">
                <span>Estimated yearly operator profit</span>
                <strong>{money(monthlyProfit * 12)}</strong>
              </div>
            </section>
          </div>

          <footer className="vizroi-page-footnote">
            <span>
              <Zap size={12} /> Simple estimate. Clear decisions.
            </span>
            <button type="button" onClick={resetCalculator}>
              Start again
            </button>
          </footer>
        </div>
      </main>

      <ProductSiteFooter />
    </div>
  );
}
