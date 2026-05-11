export const currentUser = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex.morgan@scrapbox.io',
  role: 'admin',
  avatar: null,
  initials: 'AM',
  title: 'Sales Director',
  company: 'Scrapbox',
}

export const teamMembers = [
  { id: 'u1', name: 'Alex Morgan', email: 'alex@scrapbox.io', role: 'admin', title: 'Sales Director', initials: 'AM', deals: 18, tasks: 12, revenue: 284000, target: 300000 },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@scrapbox.io', role: 'manager', title: 'Sales Manager', initials: 'SC', deals: 14, tasks: 9, revenue: 196000, target: 220000 },
  { id: 'u3', name: 'James Rivera', email: 'james@scrapbox.io', role: 'sales_rep', title: 'Senior Sales Rep', initials: 'JR', deals: 11, tasks: 15, revenue: 152000, target: 180000 },
  { id: 'u4', name: 'Priya Patel', email: 'priya@scrapbox.io', role: 'sales_rep', title: 'Sales Rep', initials: 'PP', deals: 8, tasks: 7, revenue: 98000, target: 130000 },
  { id: 'u5', name: 'Marcus Webb', email: 'marcus@scrapbox.io', role: 'support', title: 'Support Lead', initials: 'MW', deals: 0, tasks: 21, revenue: 0, target: 0 },
]

export const leads = [
  { id: 'l1', name: 'Elena Castillo', company: 'TechNova Labs', email: 'elena@technova.io', phone: '+1 555 0101', source: 'Website', status: 'New', assignedTo: 'u3', value: 45000, priority: 'High', tags: ['SaaS', 'Enterprise'], notes: 'Interested in full suite', createdAt: '2026-05-01' },
  { id: 'l2', name: 'David Park', company: 'Meridian Group', email: 'david@meridian.com', phone: '+1 555 0202', source: 'Referral', status: 'Contacted', assignedTo: 'u2', value: 28000, priority: 'Medium', tags: ['Finance'], notes: 'Demo scheduled', createdAt: '2026-04-28' },
  { id: 'l3', name: 'Olivia Turner', company: 'BrightPath Co', email: 'olivia@brightpath.co', phone: '+1 555 0303', source: 'LinkedIn', status: 'Qualified', assignedTo: 'u1', value: 62000, priority: 'High', tags: ['Retail', 'SMB'], notes: 'Very interested', createdAt: '2026-04-25' },
  { id: 'l4', name: 'Nathan Brooks', company: 'Summit Dynamics', email: 'n.brooks@summit.io', phone: '+1 555 0404', source: 'Cold Call', status: 'Proposal Sent', assignedTo: 'u3', value: 15000, priority: 'Low', tags: ['Startup'], notes: 'Waiting on budget approval', createdAt: '2026-04-20' },
  { id: 'l5', name: 'Zoe Williams', company: 'Apex Industries', email: 'zoe@apex.com', phone: '+1 555 0505', source: 'Trade Show', status: 'Negotiation', assignedTo: 'u2', value: 89000, priority: 'High', tags: ['Manufacturing', 'Enterprise'], notes: 'Final negotiation stage', createdAt: '2026-04-15' },
  { id: 'l6', name: 'Ryan Cooper', company: 'Helios Ventures', email: 'ryan@helios.vc', phone: '+1 555 0606', source: 'Website', status: 'Won', assignedTo: 'u1', value: 34000, priority: 'Medium', tags: ['VC', 'Finance'], notes: 'Signed contract', createdAt: '2026-04-10' },
  { id: 'l7', name: 'Isabella Diaz', company: 'Nexus Media', email: 'isabella@nexusmedia.com', phone: '+1 555 0707', source: 'Email Campaign', status: 'Lost', assignedTo: 'u3', value: 22000, priority: 'Low', tags: ['Media'], notes: 'Went with competitor', createdAt: '2026-04-05' },
  { id: 'l8', name: 'Connor Walsh', company: 'Urban Scale', email: 'c.walsh@urbanscale.io', phone: '+1 555 0808', source: 'Referral', status: 'New', assignedTo: 'u4', value: 18000, priority: 'Medium', tags: ['Proptech'], notes: 'Initial contact made', createdAt: '2026-05-08' },
  { id: 'l9', name: 'Aisha Johnson', company: 'DataCore Analytics', email: 'aisha@datacore.ai', phone: '+1 555 0909', source: 'Website', status: 'Contacted', assignedTo: 'u4', value: 55000, priority: 'High', tags: ['Analytics', 'SaaS'], notes: 'Follow up call tomorrow', createdAt: '2026-05-06' },
  { id: 'l10', name: 'Ethan Cruz', company: 'CloudStack Inc', email: 'ethan@cloudstack.io', phone: '+1 555 1010', source: 'LinkedIn', status: 'Qualified', assignedTo: 'u2', value: 38000, priority: 'Medium', tags: ['Cloud', 'Tech'], notes: 'Requirements gathered', createdAt: '2026-05-03' },
]

export const clients = [
  { id: 'c1', name: 'Marcus Johnson', company: 'InnoTech Solutions', email: 'marcus@innotech.com', phone: '+1 555 1111', industry: 'Technology', status: 'Active', assignedManager: 'u1', totalRevenue: 124000, deals: 4, since: '2024-03-15', address: '123 Tech Ave, SF, CA', website: 'innotech.com' },
  { id: 'c2', name: 'Sophia Laurent', company: 'Laurent & Associates', email: 'sophia@laurent.law', phone: '+1 555 2222', industry: 'Legal', status: 'Active', assignedManager: 'u2', totalRevenue: 87000, deals: 3, since: '2024-06-01', address: '456 Law Blvd, NY, NY', website: 'laurent.law' },
  { id: 'c3', name: 'Derek Huang', company: 'Quantum Logistics', email: 'derek@qlogistics.com', phone: '+1 555 3333', industry: 'Logistics', status: 'Active', assignedManager: 'u3', totalRevenue: 203000, deals: 7, since: '2023-11-20', address: '789 Port Rd, LA, CA', website: 'qlogistics.com' },
  { id: 'c4', name: 'Natalia Sousa', company: 'BioHealth Corp', email: 'natalia@biohealth.com', phone: '+1 555 4444', industry: 'Healthcare', status: 'At Risk', assignedManager: 'u2', totalRevenue: 56000, deals: 2, since: '2025-01-10', address: '321 Health St, Boston, MA', website: 'biohealth.com' },
  { id: 'c5', name: 'Tom Eriksson', company: 'Nordic Retail AB', email: 'tom@nordicretail.se', phone: '+46 555 5555', industry: 'Retail', status: 'Active', assignedManager: 'u1', totalRevenue: 342000, deals: 9, since: '2023-07-05', address: 'Storgatan 1, Stockholm', website: 'nordicretail.se' },
  { id: 'c6', name: 'Amara Osei', company: 'AfriTech Ventures', email: 'amara@afritech.co', phone: '+233 555 6666', industry: 'Fintech', status: 'Inactive', assignedManager: 'u4', totalRevenue: 28000, deals: 1, since: '2025-03-22', address: 'Accra Business Hub, Ghana', website: 'afritech.co' },
]

export const deals = [
  { id: 'd1', title: 'InnoTech Enterprise License', client: 'c1', value: 48000, probability: 90, stage: 'Negotiation', owner: 'u1', closeDate: '2026-05-20', notes: 'Final pricing review' },
  { id: 'd2', title: 'Laurent CRM Setup', client: 'c2', value: 22000, probability: 75, stage: 'Proposal', owner: 'u2', closeDate: '2026-05-30', notes: 'Proposal sent, awaiting review' },
  { id: 'd3', title: 'Quantum Annual Contract', client: 'c3', value: 85000, probability: 95, stage: 'Closed Won', owner: 'u3', closeDate: '2026-04-30', notes: 'Signed and onboarded' },
  { id: 'd4', title: 'BioHealth Starter Pack', client: 'c4', value: 12000, probability: 40, stage: 'Qualified', owner: 'u2', closeDate: '2026-06-15', notes: 'Budget concerns raised' },
  { id: 'd5', title: 'Nordic Retail Expansion', client: 'c5', value: 130000, probability: 80, stage: 'Negotiation', owner: 'u1', closeDate: '2026-05-25', notes: 'Volume discount being discussed' },
  { id: 'd6', title: 'DataCore Analytics Pro', client: null, value: 55000, probability: 60, stage: 'Proposal', owner: 'u4', closeDate: '2026-06-10', notes: 'Lead: Aisha Johnson' },
  { id: 'd7', title: 'TechNova Integration Suite', client: null, value: 45000, probability: 50, stage: 'Qualified', owner: 'u3', closeDate: '2026-06-20', notes: 'Lead: Elena Castillo' },
  { id: 'd8', title: 'AfriTech Pilot Program', client: 'c6', value: 8000, probability: 20, stage: 'Closed Lost', owner: 'u4', closeDate: '2026-04-15', notes: 'Budget not approved' },
  { id: 'd9', title: 'CloudStack SaaS Bundle', client: null, value: 38000, probability: 65, stage: 'Prospect', owner: 'u2', closeDate: '2026-07-01', notes: 'Intro call done' },
  { id: 'd10', title: 'Urban Scale Platform', client: null, value: 18000, probability: 35, stage: 'Prospect', owner: 'u4', closeDate: '2026-07-15', notes: 'Early stage' },
]

export const tasks = [
  { id: 't1', title: 'Follow up with Elena Castillo', description: 'Send pricing breakdown and schedule demo', dueDate: '2026-05-12', priority: 'High', assignee: 'u3', status: 'Pending', type: 'personal', relatedTo: 'l1' },
  { id: 't2', title: 'Prepare Nordic Retail proposal', description: 'Update proposal with new volume pricing tiers', dueDate: '2026-05-13', priority: 'High', assignee: 'u1', status: 'In Progress', type: 'team', relatedTo: 'd5' },
  { id: 't3', title: 'Q2 pipeline review', description: 'Review all open deals and update probabilities', dueDate: '2026-05-11', priority: 'Medium', assignee: 'u2', status: 'Overdue', type: 'team', relatedTo: null },
  { id: 't4', title: 'Onboard Quantum Logistics', description: 'Set up user accounts and send training materials', dueDate: '2026-05-15', priority: 'High', assignee: 'u3', status: 'In Progress', type: 'personal', relatedTo: 'c3' },
  { id: 't5', title: 'Update CRM documentation', description: 'Review and update internal sales playbook', dueDate: '2026-05-20', priority: 'Low', assignee: 'u5', status: 'Pending', type: 'team', relatedTo: null },
  { id: 't6', title: 'BioHealth check-in call', description: 'Address concerns around pricing and timeline', dueDate: '2026-05-14', priority: 'Medium', assignee: 'u2', status: 'Pending', type: 'personal', relatedTo: 'c4' },
  { id: 't7', title: 'Sales team weekly sync', description: 'Weekly pipeline and blockers review', dueDate: '2026-05-13', priority: 'Medium', assignee: 'u1', status: 'Pending', type: 'team', relatedTo: null },
  { id: 't8', title: 'Send InnoTech contract', description: 'Draft and send final contract for review', dueDate: '2026-05-16', priority: 'High', assignee: 'u1', status: 'Pending', type: 'personal', relatedTo: 'd1' },
]

export const events = [
  { id: 'e1', title: 'Demo: TechNova Labs', type: 'demo', start: '2026-05-12T10:00:00', end: '2026-05-12T11:00:00', attendees: ['u3', 'l1'], location: 'Google Meet', notes: 'Product demo - full suite walkthrough', recurring: false },
  { id: 'e2', title: 'Sales Team Weekly', type: 'meeting', start: '2026-05-13T09:00:00', end: '2026-05-13T10:00:00', attendees: ['u1', 'u2', 'u3', 'u4'], location: 'Zoom', notes: 'Pipeline and blockers review', recurring: true },
  { id: 'e3', title: 'Call: BioHealth Follow-up', type: 'call', start: '2026-05-14T14:00:00', end: '2026-05-14T14:30:00', attendees: ['u2', 'c4'], location: 'Phone', notes: 'Address budget concerns', recurring: false },
  { id: 'e4', title: 'Nordic Retail Negotiation', type: 'meeting', start: '2026-05-15T11:00:00', end: '2026-05-15T12:30:00', attendees: ['u1', 'c5'], location: 'Zoom', notes: 'Final contract negotiation', recurring: false },
  { id: 'e5', title: 'Follow-up: Meridian Group', type: 'follow-up', start: '2026-05-16T15:00:00', end: '2026-05-16T15:30:00', attendees: ['u2', 'l2'], location: 'Google Meet', notes: 'Post-demo follow up', recurring: false },
]

export const messages = [
  { id: 'm1', from: 'Elena Castillo', email: 'elena@technova.io', channel: 'email', subject: 'Re: Product Demo Request', preview: 'Thank you for the overview. We\'d love to schedule a full demo...', time: '2026-05-11T09:15:00', read: false, thread: [] },
  { id: 'm2', from: 'David Park', email: 'david@meridian.com', channel: 'whatsapp', subject: 'Demo follow-up', preview: 'Hi, just wanted to circle back on the pricing we discussed...', time: '2026-05-11T08:30:00', read: false, thread: [] },
  { id: 'm3', from: 'Zoe Williams', email: 'zoe@apex.com', channel: 'email', subject: 'Contract terms', preview: 'I\'ve reviewed the proposal. A few items I\'d like to discuss...', time: '2026-05-10T16:45:00', read: true, thread: [] },
  { id: 'm4', from: 'Tom Eriksson', email: 'tom@nordicretail.se', channel: 'email', subject: 'Nordic Retail Expansion - Update', preview: 'Following our call, we\'re ready to proceed with the expanded...', time: '2026-05-10T11:20:00', read: true, thread: [] },
  { id: 'm5', from: 'Aisha Johnson', email: 'aisha@datacore.ai', channel: 'sms', subject: 'SMS: Quick question', preview: 'Hi! Quick question about the analytics features...', time: '2026-05-09T14:00:00', read: true, thread: [] },
]

export const notifications = [
  { id: 'n1', type: 'lead', title: 'New lead assigned', body: 'Connor Walsh from Urban Scale has been assigned to you', time: '2026-05-11T10:00:00', read: false },
  { id: 'n2', type: 'deal', title: 'Deal won!', body: 'Quantum Annual Contract has been marked as Closed Won', time: '2026-05-11T08:00:00', read: false },
  { id: 'n3', type: 'task', title: 'Task overdue', body: 'Q2 pipeline review is now overdue', time: '2026-05-11T07:00:00', read: false },
  { id: 'n4', type: 'mention', title: 'You were mentioned', body: 'Sarah Chen mentioned you in the Nordic Retail deal notes', time: '2026-05-10T17:30:00', read: true },
  { id: 'n5', type: 'reminder', title: 'Meeting in 30 minutes', body: 'Demo: TechNova Labs starts at 10:00 AM', time: '2026-05-12T09:30:00', read: true },
]

export const activities = [
  { id: 'a1', user: 'u1', action: 'won deal', subject: 'Quantum Annual Contract', time: '2026-05-11T08:00:00', type: 'deal' },
  { id: 'a2', user: 'u3', action: 'added lead', subject: 'Elena Castillo from TechNova Labs', time: '2026-05-11T07:30:00', type: 'lead' },
  { id: 'a3', user: 'u2', action: 'updated deal stage', subject: 'Laurent CRM Setup → Proposal', time: '2026-05-10T16:00:00', type: 'deal' },
  { id: 'a4', user: 'u4', action: 'completed task', subject: 'Send product overview to Aisha Johnson', time: '2026-05-10T14:30:00', type: 'task' },
  { id: 'a5', user: 'u1', action: 'added client', subject: 'Nordic Retail AB', time: '2026-05-10T11:00:00', type: 'client' },
  { id: 'a6', user: 'u2', action: 'sent proposal', subject: 'BioHealth Starter Pack', time: '2026-05-09T15:00:00', type: 'deal' },
]

export const revenueData = [
  { month: 'Jan', revenue: 42000, target: 50000 },
  { month: 'Feb', revenue: 58000, target: 55000 },
  { month: 'Mar', revenue: 51000, target: 60000 },
  { month: 'Apr', revenue: 74000, target: 70000 },
  { month: 'May', revenue: 63000, target: 75000 },
  { month: 'Jun', revenue: 89000, target: 80000 },
  { month: 'Jul', revenue: 95000, target: 85000 },
  { month: 'Aug', revenue: 78000, target: 90000 },
  { month: 'Sep', revenue: 112000, target: 95000 },
  { month: 'Oct', revenue: 98000, target: 100000 },
  { month: 'Nov', revenue: 134000, target: 110000 },
  { month: 'Dec', revenue: 156000, target: 120000 },
]

export const leadsPerMonth = [
  { month: 'Jan', leads: 18 },
  { month: 'Feb', leads: 24 },
  { month: 'Mar', leads: 21 },
  { month: 'Apr', leads: 32 },
  { month: 'May', leads: 28 },
  { month: 'Jun', leads: 38 },
]

export const leadSources = [
  { name: 'Website', value: 35 },
  { name: 'Referral', value: 28 },
  { name: 'LinkedIn', value: 18 },
  { name: 'Cold Call', value: 10 },
  { name: 'Trade Show', value: 9 },
]

export const funnelData = [
  { stage: 'Leads', count: 48 },
  { stage: 'Contacted', count: 36 },
  { stage: 'Qualified', count: 24 },
  { stage: 'Proposal', count: 16 },
  { stage: 'Negotiation', count: 10 },
  { stage: 'Won', count: 6 },
]

export const documents = [
  { id: 'doc1', name: 'Nordic Retail Contract 2026.pdf', category: 'contracts', size: '2.4 MB', uploadedBy: 'u1', uploadedAt: '2026-05-10', client: 'c5' },
  { id: 'doc2', name: 'Quantum Logistics Proposal.pdf', category: 'proposals', size: '1.8 MB', uploadedBy: 'u3', uploadedAt: '2026-04-25', client: 'c3' },
  { id: 'doc3', name: 'InnoTech Invoice #2026-042.pdf', category: 'invoices', size: '340 KB', uploadedBy: 'u1', uploadedAt: '2026-04-30', client: 'c1' },
  { id: 'doc4', name: 'BioHealth NDA.docx', category: 'contracts', size: '890 KB', uploadedBy: 'u2', uploadedAt: '2026-05-02', client: 'c4' },
  { id: 'doc5', name: 'Q2 Sales Playbook.pdf', category: 'misc', size: '5.1 MB', uploadedBy: 'u5', uploadedAt: '2026-04-01', client: null },
]
