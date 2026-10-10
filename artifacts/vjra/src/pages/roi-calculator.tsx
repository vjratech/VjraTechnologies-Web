import { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  Calculator,
  Check,
  ChevronDown,
  CircleDollarSign,
  Plus,
  Settings2,
  Trash2,
  X,
  Zap,
} from 'lucide-react';

import { products } from '@/data/products';
import { ProductSiteFooter, ProductSiteHeader } from '@/components/products';

import './roi-calculator.css';

/* -------------------------------------------------------
   FIXED COMMERCIAL ASSUMPTIONS
   These values are deliberately not editable by visitors.
------------------------------------------------------- */

const GST_RATE = 18;
const OPERATING_DAYS = 30;
const VIZ_MARGIN_PER_KWH = 2;

/* -------------------------------------------------------
   PRODUCT CATALOGUE
   Prices come from src/data/products.ts, per variant.
------------------------------------------------------- */

type ChargerOption = {
  key: string;
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  power: string;
  price: number;
  image: string;
};

type SelectedCharger = {
  key: string;
  quantity: number;
  unitPrice: number;
};

const CHARGER_OPTIONS: ChargerOption[] = products.flatMap((product) =>
  product.variants.map((variant) => ({
    key: `${product.id}::${variant.id}`,
    productId: product.id,
    variantId: variant.id,
    name: product.cardName,
    variantName: variant.name,
    power: variant.power ?? product.subtitle,
    price: variant.price ?? 0,
    image: product.image,
  })),
);

const OPTION_BY_KEY = new Map(
  CHARGER_OPTIONS.map((option) => [option.key, option]),
);

/* -------------------------------------------------------
   FORMATTERS AND VALIDATION
------------------------------------------------------- */

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
});

function money(value: number): string {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function numberText(value: number): string {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function toInputNumber(value: string, min: number, max: number): number {
  if (value.trim() === '') return min;

  const parsed = Number(value);
  return clamp(parsed, min, max);
}

/* -------------------------------------------------------
   REUSABLE SLIDER + NUMERIC INPUT
------------------------------------------------------- */

type RangeFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
};

function RangeField({
  label,
  value,
  min,
  max,
  step,
  unit = '',
  onChange,
}: RangeFieldProps) {
  const id = `roi-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="roi-control">
      <div className="roi-control-heading">
        <label htmlFor={`${id}-number`}>{label}</label>

        <div className="roi-control-value">
          <input
            id={`${id}-number`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) =>
              onChange(toInputNumber(event.target.value, min, max))
            }
            aria-label={label}
          />
          {unit && <span>{unit}</span>}
        </div>
      </div>

      <input
        className="roi-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`${label} slider`}
      />
    </div>
  );
}

/* -------------------------------------------------------
   MAIN PAGE
------------------------------------------------------- */

export default function RoiCalculator() {
  /* Charging demand */
  const [bikesPerDay, setBikesPerDay] = useState(5);
  const [carsPerDay, setCarsPerDay] = useState(1);
  const [bikeKwh, setBikeKwh] = useState(2.5);
  const [carKwh, setCarKwh] = useState(20);

  /* Editable tariff assumptions */
  const [endUserRate, setEndUserRate] = useState(15);
  const [greenMeterTariff, setGreenMeterTariff] = useState(7.33);

  /* Investment */
  const [selectedChargers, setSelectedChargers] = useState<
    SelectedCharger[]
  >([]);
  const [installationCost, setInstallationCost] = useState(0);

  /* Charger selector modal */
  const [showChargerModal, setShowChargerModal] = useState(false);
  const [optionToAdd, setOptionToAdd] = useState(
    CHARGER_OPTIONS[0]?.key ?? '',
  );

  const equipmentCost = useMemo(
    () =>
      selectedChargers.reduce(
        (total, charger) =>
          total + charger.quantity * charger.unitPrice,
        0,
      ),
    [selectedChargers],
  );

  const totalInvestment = equipmentCost + installationCost;

  const selectedUnitCount = selectedChargers.reduce(
    (total, charger) => total + charger.quantity,
    0,
  );

  /* -----------------------------------------------------
     LIVE FINANCIAL CALCULATIONS

     Daily energy = bikes × bike kWh + cars × car kWh

     Customer rate INCLUDES GST.
     GST component = gross collections × 18 / 118

     Operator profit =
       gross collections
       - GST component
       - electricity cost
       - fixed VIZ margin
  ----------------------------------------------------- */

  const energyPerDay =
    bikesPerDay * bikeKwh + carsPerDay * carKwh;

  const dailyRevenue = energyPerDay * endUserRate;
  const monthlyRevenue = dailyRevenue * OPERATING_DAYS;

  // Extract GST from the GST-inclusive customer collections.
  const dailyGst = dailyRevenue * (GST_RATE / (100 + GST_RATE));
  const monthlyGst = dailyGst * OPERATING_DAYS;

  const dailyElectricityCost = energyPerDay * greenMeterTariff;
  const monthlyElectricityCost =
    dailyElectricityCost * OPERATING_DAYS;

  const dailyVizMargin = energyPerDay * VIZ_MARGIN_PER_KWH;
  const monthlyVizMargin = dailyVizMargin * OPERATING_DAYS;

  const dailyOperatorProfit =
    dailyRevenue -
    dailyGst -
    dailyElectricityCost -
    dailyVizMargin;

  const monthlyOperatorProfit = dailyOperatorProfit * OPERATING_DAYS;

  const annualOperatorProfit = monthlyOperatorProfit * 12;

  const paybackMonths =
    monthlyOperatorProfit > 0
      ? totalInvestment / monthlyOperatorProfit
      : null;

  const hasSelectedChargers = selectedChargers.length > 0;

  const paybackText = !hasSelectedChargers
    ? 'Select charger'
    : totalInvestment <= 0
      ? 'No upfront cost'
      : monthlyOperatorProfit <= 0
        ? 'No break-even'
        : `${numberText(paybackMonths ?? 0)} months`;

  /* -----------------------------------------------------
     CHARGER SELECTION HELPERS
  ----------------------------------------------------- */

  function addCharger() {
    const option = OPTION_BY_KEY.get(optionToAdd);
    if (!option) return;

    setSelectedChargers((current) => {
      const existing = current.find(
        (charger) => charger.key === option.key,
      );

      if (existing) {
        return current.map((charger) =>
          charger.key === option.key
            ? { ...charger, quantity: charger.quantity + 1 }
            : charger,
        );
      }

      return [
        ...current,
        {
          key: option.key,
          quantity: 1,
          unitPrice: option.price,
        },
      ];
    });
  }

  function updateCharger(
    key: string,
    updates: Partial<SelectedCharger>,
  ) {
    setSelectedChargers((current) =>
      current.map((charger) =>
        charger.key === key ? { ...charger, ...updates } : charger,
      ),
    );
  }

  function removeCharger(key: string) {
    setSelectedChargers((current) =>
      current.filter((charger) => charger.key !== key),
    );
  }

  function resetCalculator() {
    setBikesPerDay(5);
    setCarsPerDay(1);
    setBikeKwh(2.5);
    setCarKwh(20);
    setEndUserRate(15);
    setGreenMeterTariff(7.33);
    setInstallationCost(0);
    setSelectedChargers([]);
    setOptionToAdd(CHARGER_OPTIONS[0]?.key ?? '');
  }

  return (
    <div className="roi-calculator-page">
      <ProductSiteHeader />

      <main className="roi-screen">
        <div className="roi-workspace">
          {/* PAGE TITLE */}
          <div className="roi-page-heading">
            <div>
              <div className="roi-eyebrow">
                <Zap size={13} />
                VIZ SMART CHARGING
              </div>

              <h1>ROI Calculator</h1>

              <p>
                Estimate charging revenue, operator profit and payback.
              </p>
            </div>

            <button
              type="button"
              className="roi-reset-button"
              onClick={resetCalculator}
            >
              Reset
            </button>
          </div>

          {/* CHARGER SELECTION BAR */}
          <section className="roi-charger-toolbar">
            <div className="roi-toolbar-icon">
              <Settings2 size={20} />
            </div>

            <div className="roi-toolbar-text">
              <strong>
                {selectedUnitCount > 0
                  ? `${selectedUnitCount} charger ${
                      selectedUnitCount === 1 ? 'unit' : 'units'
                    } selected`
                  : 'Select your chargers'}
              </strong>

              <span>
                Equipment: {money(equipmentCost)}
              </span>
            </div>

            <button
              type="button"
              className="roi-primary-button"
              onClick={() => setShowChargerModal(true)}
            >
              <Plus size={16} />
              Configure
            </button>
          </section>

          {/* INPUTS + RESULTS */}
          <div className="roi-calculator-grid">
            {/* LEFT: INPUTS */}
            <section className="roi-panel roi-input-panel">
              <div className="roi-panel-heading">
                <div className="roi-panel-icon roi-icon-blue">
                  <Calculator size={17} />
                </div>
                <div>
                  <h2>Charging assumptions</h2>
                  <p>Adjust daily usage and tariffs</p>
                </div>
              </div>

              {/* DEMAND */}
              <div className="roi-section">
                <div className="roi-section-title">
                  <span>Daily charging demand</span>
                </div>

                <div className="roi-control-grid">
                  <RangeField
                    label="Bikes / scooters"
                    value={bikesPerDay}
                    min={0}
                    max={100}
                    step={1}
                    unit="/ day"
                    onChange={setBikesPerDay}
                  />

                  <RangeField
                    label="kWh per bike"
                    value={bikeKwh}
                    min={0.5}
                    max={10}
                    step={0.5}
                    unit="kWh"
                    onChange={setBikeKwh}
                  />

                  <RangeField
                    label="Cars"
                    value={carsPerDay}
                    min={0}
                    max={50}
                    step={1}
                    unit="/ day"
                    onChange={setCarsPerDay}
                  />

                  <RangeField
                    label="kWh per car"
                    value={carKwh}
                    min={5}
                    max={150}
                    step={1}
                    unit="kWh"
                    onChange={setCarKwh}
                  />
                </div>
              </div>

              {/* TARIFFS */}
              <div className="roi-section">
                <div className="roi-section-title">
                  <span>Rates & costs</span>
                </div>

                <div className="roi-control-grid">
                  <RangeField
                    label="Customer rate"
                    value={endUserRate}
                    min={1}
                    max={50}
                    step={0.5}
                    unit="₹/kWh"
                    onChange={setEndUserRate}
                  />

                  <RangeField
                    label="Green meter"
                    value={greenMeterTariff}
                    min={0}
                    max={25}
                    step={0.01}
                    unit="₹/kWh"
                    onChange={setGreenMeterTariff}
                  />
                </div>

                <p className="roi-inline-note">
                  Customer rate includes GST.
                </p>
              </div>

              {/* FIXED ASSUMPTIONS */}
              <div className="roi-fixed-assumptions">
                <div className="roi-fixed-title">Fixed assumptions</div>

                <div className="roi-fixed-pills">
                  <span>
                    GST <strong>{GST_RATE}%</strong>
                  </span>
                  <span>
                    VIZ margin <strong>₹{VIZ_MARGIN_PER_KWH}/kWh</strong>
                  </span>
                  <span>
                    <strong>{OPERATING_DAYS}</strong> days/month
                  </span>
                </div>
              </div>

              {/* INSTALLATION */}
              <div className="roi-installation-row">
                <div>
                  <strong>Installation / setup</strong>
                  <span>Default ₹0; editable</span>
                </div>

                <label className="roi-money-input">
                  <span>₹</span>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={installationCost}
                    onChange={(event) =>
                      setInstallationCost(
                        toInputNumber(
                          event.target.value,
                          0,
                          100000000,
                        ),
                      )
                    }
                    aria-label="Installation and setup cost"
                  />
                </label>
              </div>
            </section>

            {/* RIGHT: RESULTS */}
            <section className="roi-panel roi-results-panel">
              <div className="roi-panel-heading">
                <div className="roi-panel-icon roi-icon-green">
                  <CircleDollarSign size={18} />
                </div>
                <div>
                  <h2>Estimated returns</h2>
                  <p>Based on {numberText(energyPerDay)} kWh/day</p>
                </div>
              </div>

              {/* REVENUE + PROFIT METRICS */}
              <div className="roi-metrics-grid">
                <div className="roi-metric roi-metric-revenue">
                  <span>Daily revenue</span>
                  <strong>{money(dailyRevenue)}</strong>
                  <small>Including GST</small>
                </div>

                <div className="roi-metric roi-metric-revenue">
                  <span>Monthly revenue</span>
                  <strong>{money(monthlyRevenue)}</strong>
                  <small>{OPERATING_DAYS} operating days</small>
                </div>

                <div className="roi-metric roi-metric-profit">
                  <span>Daily operator profit</span>
                  <strong
                    className={
                      dailyOperatorProfit < 0 ? 'roi-negative' : ''
                    }
                  >
                    {money(dailyOperatorProfit)}
                  </strong>
                  <small>After listed costs</small>
                </div>

                <div className="roi-metric roi-metric-profit roi-metric-featured">
                  <span>Monthly operator profit</span>
                  <strong
                    className={
                      monthlyOperatorProfit < 0 ? 'roi-negative' : ''
                    }
                  >
                    {money(monthlyOperatorProfit)}
                  </strong>
                  <small>Estimated operator earnings</small>
                </div>
              </div>

              {/* MONTHLY BREAKDOWN */}
              <div className="roi-breakdown">
                <div className="roi-section-title">
                  <span>Monthly cost breakdown</span>
                </div>

                <div className="roi-breakdown-row">
                  <span>GST component</span>
                  <strong>{money(monthlyGst)}</strong>
                </div>

                <div className="roi-breakdown-row">
                  <span>Green meter electricity</span>
                  <strong>{money(monthlyElectricityCost)}</strong>
                </div>

                <div className="roi-breakdown-row">
                  <span>VIZ margin</span>
                  <strong>{money(monthlyVizMargin)}</strong>
                </div>

                <div className="roi-breakdown-row roi-breakdown-total">
                  <span>Operator profit / month</span>
                  <strong>{money(monthlyOperatorProfit)}</strong>
                </div>
              </div>

              {/* INVESTMENT + PAYBACK */}
              <div className="roi-payback-card">
                <div className="roi-investment-summary">
                  <span>Total investment</span>
                  <strong>{money(totalInvestment)}</strong>
                  <small>
                    {money(equipmentCost)} equipment
                    {' + '}
                    {money(installationCost)} setup
                  </small>
                </div>

                <div className="roi-payback-divider" />

                <div className="roi-payback-summary">
                  <span>
                    <ArrowDownRight size={14} />
                    Break-even
                  </span>
                  <strong>{paybackText}</strong>
                  <small>Estimated payback period</small>
                </div>
              </div>

              <div className="roi-disclaimer">
                <Check size={13} />
                <span>
                  Estimate only. Excludes rent, maintenance, payment fees,
                  downtime and financing costs.
                </span>
              </div>
            </section>
          </div>

          <div className="roi-footer-note">
            <span>
              <Zap size={12} />
              {numberText(energyPerDay)} kWh/day
            </span>
            <span>
              Annual operator profit: {money(annualOperatorProfit)}
            </span>
          </div>
        </div>
      </main>

      <ProductSiteFooter />

      {/* -------------------------------------------------
          CHARGER SELECTION MODAL
          Editing these prices does not change the catalogue.
      ------------------------------------------------- */}

      {showChargerModal && (
        <div
          className="roi-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowChargerModal(false);
            }
          }}
        >
          <section
            className="roi-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="roi-modal-title"
          >
            <div className="roi-modal-heading">
              <div>
                <div className="roi-eyebrow">
                  <Settings2 size={13} />
                  EQUIPMENT CONFIGURATION
                </div>

                <h2 id="roi-modal-title">Select your chargers</h2>

                <p>
                  Add one or more catalogue variants and edit their unit
                  prices or quantities.
                </p>
              </div>

              <button
                type="button"
                className="roi-icon-button"
                onClick={() => setShowChargerModal(false)}
                aria-label="Close charger selector"
              >
                <X size={19} />
              </button>
            </div>

            <div className="roi-add-charger-row">
              <label htmlFor="roi-product-select">
                Product / configuration
              </label>

              <div className="roi-product-select-wrap">
                <select
                  id="roi-product-select"
                  value={optionToAdd}
                  onChange={(event) => setOptionToAdd(event.target.value)}
                >
                  {CHARGER_OPTIONS.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name} — {option.variantName} —{' '}
                      {money(option.price)}
                    </option>
                  ))}
                </select>

                <ChevronDown size={16} />
              </div>

              <button
                type="button"
                className="roi-primary-button"
                onClick={addCharger}
                disabled={!optionToAdd}
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="roi-selected-list">
              {selectedChargers.length === 0 ? (
                <div className="roi-empty-selection">
                  <div className="roi-empty-icon">
                    <Zap size={22} />
                  </div>

                  <strong>No chargers added yet</strong>

                  <p>
                    Choose a product above, then press Add.
                  </p>
                </div>
              ) : (
                selectedChargers.map((charger) => {
                  const option = OPTION_BY_KEY.get(charger.key);
                  if (!option) return null;

                  return (
                    <div className="roi-selected-row" key={charger.key}>
                      <div className="roi-selected-main">
                        <img src={option.image} alt="" />

                        <div className="roi-selected-description">
                          <strong>{option.name}</strong>
                          <span>
                            {option.variantName} · {option.power}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="roi-remove-button"
                          onClick={() => removeCharger(charger.key)}
                          aria-label={`Remove ${option.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="roi-selected-fields">
                        <label>
                          Quantity
                          <input
                            type="number"
                            min={1}
                            max={100}
                            step={1}
                            value={charger.quantity}
                            onChange={(event) =>
                              updateCharger(charger.key, {
                                quantity: Math.round(
                                  toInputNumber(
                                    event.target.value,
                                    1,
                                    100,
                                  ),
                                ),
                              })
                            }
                          />
                        </label>

                        <label>
                          Unit price (₹)
                          <input
                            type="number"
                            min={0}
                            max={100000000}
                            step={100}
                            value={charger.unitPrice}
                            onChange={(event) =>
                              updateCharger(charger.key, {
                                unitPrice: toInputNumber(
                                  event.target.value,
                                  0,
                                  100000000,
                                ),
                              })
                            }
                          />
                        </label>

                        <div className="roi-line-total">
                          <span>Line total</span>
                          <strong>
                            {money(charger.quantity * charger.unitPrice)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="roi-modal-footer">
              <div>
                <span>Equipment investment</span>
                <strong>{money(equipmentCost)}</strong>
              </div>

              <button
                type="button"
                className="roi-primary-button"
                onClick={() => setShowChargerModal(false)}
              >
                <Check size={16} />
                Done
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}