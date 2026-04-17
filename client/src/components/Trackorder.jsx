import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Mock tracking data — replace with Royal Mail API call later
const getMockTracking = (trackingNumber) => ({
  trackingNumber,
  service: 'Royal Mail Tracked 48',
  estimatedDelivery: 'Wednesday, 16 April 2026',
  sender: 'MAURION',
  recipient: {
    name: 'John Doe',
    address: '12 Baker Street, London, W1U 6TY',
  },
  currentStatus: 'out_for_delivery',
  events: [
    {
      status: 'out_for_delivery',
      title: 'Out for Delivery',
      description: 'Your parcel is with your postman and will be delivered today.',
      location: 'London Delivery Office, EC1A 1BB',
      date: 'Wed 16 Apr 2026',
      time: '07:42 AM',
      done: true,
      active: true,
    },
    {
      status: 'arrived_delivery_office',
      title: 'Arrived at Delivery Office',
      description: 'Your parcel has arrived at the local delivery office.',
      location: 'London Delivery Office, EC1A 1BB',
      date: 'Wed 16 Apr 2026',
      time: '05:18 AM',
      done: true,
      active: false,
    },
    {
      status: 'in_transit',
      title: 'In Transit',
      description: 'Your parcel is on its way to your local delivery office.',
      location: 'Royal Mail Hub, Midlands',
      date: 'Tue 15 Apr 2026',
      time: '11:30 PM',
      done: true,
      active: false,
    },
    {
      status: 'despatched',
      title: 'Despatched',
      description: 'Your parcel has been collected and is on its way.',
      location: 'MAURION Warehouse, Manchester',
      date: 'Tue 15 Apr 2026',
      time: '02:15 PM',
      done: true,
      active: false,
    },
    {
      status: 'order_placed',
      title: 'Order Placed',
      description: 'We have received your order and are preparing it for dispatch.',
      location: 'MAURION',
      date: 'Mon 14 Apr 2026',
      time: '09:00 AM',
      done: true,
      active: false,
    },
  ],
});

const statusConfig = {
  order_placed:           { icon: 'package_2',       color: 'bg-zinc-900',   label: 'Order Placed' },
  despatched:             { icon: 'local_shipping',  color: 'bg-zinc-900',   label: 'Despatched' },
  in_transit:             { icon: 'route',           color: 'bg-zinc-900',   label: 'In Transit' },
  arrived_delivery_office:{ icon: 'warehouse',       color: 'bg-zinc-900',   label: 'At Delivery Office' },
  out_for_delivery:       { icon: 'directions_bike', color: 'bg-green-500',  label: 'Out for Delivery' },
  delivered:              { icon: 'check_circle',    color: 'bg-green-500',  label: 'Delivered' },
  attempted_delivery:     { icon: 'error',           color: 'bg-amber-500',  label: 'Attempted Delivery' },
  exception:              { icon: 'warning',         color: 'bg-red-500',    label: 'Issue' },
};

// ── Track by input page ───────────────────────────────────────────────────────
const TrackSearch = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleTrack = () => {
    if (!input.trim()) { setError('Please enter a tracking number.'); return; }
    window.location.href = `/track/${input.trim().toUpperCase()}`;
  };

  return (
    <main className="pt-32 pb-20 min-h-screen max-w-screen-xl mx-auto px-8">
      <div className="max-w-xl mx-auto text-center">
        {/* Royal Mail red stripe top */}
        <div className="w-12 h-1.5 bg-red-600 rounded-full mx-auto mb-8" />

        <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 uppercase leading-none mb-4">
          Track Your Order
        </h1>
        <p className="text-neutral-400 text-sm mb-12 leading-relaxed">
          Enter your Royal Mail tracking number to get live updates on your delivery.
        </p>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => { setInput(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleTrack()}
            placeholder="e.g. TT123456789GB"
            className="flex-1 border border-zinc-200 rounded-lg px-5 py-4 text-sm font-medium outline-none focus:border-zinc-900 transition-colors bg-white tracking-widest uppercase"
          />
          <button
            onClick={handleTrack}
            className="px-8 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity rounded-lg whitespace-nowrap"
          >
            Track
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-500 font-bold">{error}</p>}

        <p className="mt-8 text-xs text-zinc-400 font-bold">
          Your tracking number is in your order confirmation email.
        </p>
      </div>
    </main>
  );
};

// ── Tracking result page ──────────────────────────────────────────────────────
const TrackResult = ({ trackingNumber }) => {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scrollTo(0, 0);
    // Simulate API call delay
    // Replace this with: fetch(`/api/tracking/${trackingNumber}`)
    setTimeout(() => {
      setData(getMockTracking(trackingNumber));
      setLoading(false);
    }, 1200);
  }, [trackingNumber]);

  if (loading) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest">Fetching tracking info...</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <p className="text-neutral-400 mb-6">Tracking number not found.</p>
          <Link to="/track" className="px-10 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest">
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  const current = statusConfig[data.currentStatus] || statusConfig.in_transit;

  return (
    <main className="pt-32 pb-20 min-h-screen max-w-screen-xl mx-auto px-8">

      {/* Header */}
      <div className="mb-12">
        <Link to="/track" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors mb-6">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Track Another
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Royal Mail</span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 uppercase leading-none">
              {data.trackingNumber}
            </h1>
            <p className="text-sm text-zinc-400 font-medium mt-2">{data.service}</p>
          </div>
          <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${current.color} self-start md:self-auto`}>
            <span className="material-symbols-outlined text-white text-base">{current.icon}</span>
            <span className="text-white text-xs font-black uppercase tracking-widest">{current.label}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* ── Left: Timeline ───────────────────────────────────────────────── */}
        <div className="flex-1">
          <h2 className="font-headline font-black text-sm uppercase tracking-widest text-zinc-400 mb-8">
            Tracking History
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3.5 top-4 bottom-4 w-px bg-zinc-100" />

            <div className="space-y-0">
              {data.events.map((event, i) => (
                <div key={i} className="flex gap-6 relative pb-8 last:pb-0">
                  {/* Dot */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                    event.active
                      ? `${statusConfig[event.status]?.color || 'bg-zinc-900'} shadow-lg`
                      : event.done
                      ? 'bg-zinc-900'
                      : 'bg-zinc-100'
                  }`}>
                    <span className={`material-symbols-outlined text-sm ${event.done ? 'text-white' : 'text-zinc-300'}`}>
                      {event.active
                        ? statusConfig[event.status]?.icon || 'radio_button_checked'
                        : event.done ? 'check' : 'radio_button_unchecked'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-0 ${event.active ? '' : 'opacity-70'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <h3 className={`font-black text-sm uppercase tracking-tight ${event.active ? 'text-zinc-900' : 'text-zinc-600'}`}>
                        {event.title}
                        {event.active && (
                          <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                            Latest
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-zinc-400 font-bold shrink-0">
                        {event.date} · {event.time}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 font-medium mb-1">{event.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Info Panel ────────────────────────────────────────────── */}
        <aside className="lg:w-72 shrink-0 space-y-4">

          {/* Estimated Delivery */}
          <div className="bg-zinc-900 rounded-2xl p-6 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-2">
              Estimated Delivery
            </p>
            <p className="font-headline font-black text-lg leading-tight">{data.estimatedDelivery}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-base">check_circle</span>
              <span className="text-xs text-white/70 font-bold">On schedule</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-zinc-50 rounded-2xl p-6">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">Delivering To</p>
            <p className="text-sm font-black text-zinc-900">{data.recipient.name}</p>
            <p className="text-sm text-zinc-500 font-medium mt-0.5 leading-relaxed">{data.recipient.address}</p>
          </div>

          {/* Service Info */}
          <div className="bg-zinc-50 rounded-2xl p-6">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">Service</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600 shrink-0" />
              <p className="text-sm font-black text-zinc-900">{data.service}</p>
            </div>
            <p className="text-xs text-zinc-400 font-bold mt-2">Sent by {data.sender}</p>
          </div>

          {/* Royal Mail link */}
          <a
            href={`https://www.royalmail.com/track-your-item#/tracking-results/${data.trackingNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 border border-zinc-200 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all"
          >
            <div className="w-3 h-3 rounded-full bg-red-600" />
            Track on Royal Mail
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>

        </aside>
      </div>
    </main>
  );
};

// ── Router wrapper ────────────────────────────────────────────────────────────
const TrackOrder = () => {
  const { trackingNumber } = useParams();
  return trackingNumber ? <TrackResult trackingNumber={trackingNumber} /> : <TrackSearch />;
};

export default TrackOrder;