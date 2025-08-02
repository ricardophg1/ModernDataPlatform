import { useState } from 'react';
import { Plus, Search, Clock, Play, Pause, RotateCcw, AlertCircle, GitBranch, Settings, X } from 'lucide-react';

interface Job {
  id: number;
  name: string;
  status: 'Running' | 'Scheduled' | 'Failed' | 'Paused';
  duration: string;
  nextRun: string;
  schedule: string;
  type: 'sync' | 'report' | 'model';
  lastRun?: string;
  description?: string;
  logs?: string[];
}

export function JobsSection() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      name: 'Daily Data Sync',
      status: 'Running',
      duration: '15m',
      nextRun: '45m',
      schedule: '0 0 * * *',
      type: 'sync',
      description: 'Synchronize data from multiple sources',
      logs: ['Starting sync process...', 'Connected to data source', 'Processing records...']
    },
    {
      id: 2,
      name: 'Weekly Reports',
      status: 'Scheduled',
      duration: '2h',
      nextRun: '3d',
      schedule: '0 0 * * 0',
      type: 'report',
      description: 'Generate weekly analytics reports',
      logs: ['Last run completed successfully', 'Generated 15 reports', 'Sent email notifications']
    },
    {
      id: 3,
      name: 'Model Retraining',
      status: 'Failed',
      duration: '1h',
      nextRun: '1h',
      schedule: '0 */12 * * *',
      type: 'model',
      description: 'Retrain ML models with new data',
      logs: ['Error: Insufficient training data', 'Job failed after 45 minutes', 'Attempting retry...']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  const handleJobAction = (jobId: number, action: 'start' | 'pause' | 'retry') => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        switch (action) {
          case 'start':
            return { ...job, status: 'Running' as const };
          case 'pause':
            return { ...job, status: 'Paused' as const };
          case 'retry':
            return { ...job, status: 'Running' as const };
          default:
            return job;
        }
      }
      return job;
    }));
  };

  const filteredJobs = jobs.filter(job =>
    job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderJobModal = () => {
    if (!isNewJobModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-slate-800 rounded-xl max-w-2xl w-full shadow-xl border border-slate-700">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Create New Job</h2>
            </div>
            <button
              onClick={() => setIsNewJobModalOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Job Name
              </label>
              <input
                type="text"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter job name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Job Type
              </label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="sync">Data Sync</option>
                <option value="report">Report Generation</option>
                <option value="model">Model Training</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Schedule
              </label>
              <div className="flex items-center space-x-4">
                <select className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom</option>
                </select>
                <input
                  type="time"
                  className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="Enter job description"
              />
            </div>
          </form>

          <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-700">
            <button
              onClick={() => setIsNewJobModalOpen(false)}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsNewJobModalOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Job
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderJobDetails = () => {
    if (!selectedJob || !showJobDetails) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-slate-800 rounded-xl max-w-4xl w-full shadow-xl border border-slate-700">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              {selectedJob.type === 'sync' && <GitBranch className="h-6 w-6 text-blue-400" />}
              {selectedJob.type === 'report' && <Clock className="h-6 w-6 text-green-400" />}
              {selectedJob.type === 'model' && <Settings className="h-6 w-6 text-purple-400" />}
              <h2 className="text-xl font-semibold text-white">{selectedJob.name}</h2>
            </div>
            <button
              onClick={() => setShowJobDetails(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-400">Status</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedJob.status === 'Running' ? 'bg-blue-500/20 text-blue-400' :
                    selectedJob.status === 'Failed' ? 'bg-red-500/20 text-red-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedJob.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400">Schedule</h3>
                  <p className="text-white">{selectedJob.schedule}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-400">Duration</h3>
                  <p className="text-white">{selectedJob.duration}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">Description</h3>
                <p className="text-white">{selectedJob.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-4">Recent Logs</h3>
              <div className="bg-slate-900 rounded-lg p-4 space-y-2">
                {selectedJob.logs?.map((log, index) => (
                  <div key={index} className="text-sm text-slate-300 font-mono">{log}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-700">
            <button
              onClick={() => setShowJobDetails(false)}
              className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleJobAction(selectedJob.id, selectedJob.status === 'Running' ? 'pause' : 'start');
                setShowJobDetails(false);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              {selectedJob.status === 'Running' ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause Job</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Job</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Jobs</h1>
          <p className="text-slate-400">Schedule and monitor automated tasks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="bg-slate-700/50 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button
            onClick={() => setIsNewJobModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Plus className="h-5 w-5" />
            <span>New Job</span>
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Active Jobs</h3>
        </div>
        <div className="divide-y divide-slate-700">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 hover:bg-slate-700/50 transition flex items-center justify-between cursor-pointer"
              onClick={() => {
                setSelectedJob(job);
                setShowJobDetails(true);
              }}
            >
              <div className="flex items-center space-x-4">
                {job.type === 'sync' && <GitBranch className="h-5 w-5 text-blue-400" />}
                {job.type === 'report' && <Clock className="h-5 w-5 text-green-400" />}
                {job.type === 'model' && <Settings className="h-5 w-5 text-purple-400" />}
                <div>
                  <h4 className="text-white font-medium">{job.name}</h4>
                  <p className="text-slate-400 text-sm">Duration: {job.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-400">Next run: {job.nextRun}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  job.status === 'Running' ? 'bg-blue-500/20 text-blue-400' :
                  job.status === 'Failed' ? 'bg-red-500/20 text-red-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {job.status}
                </span>
                <div className="flex items-center space-x-2">
                  {job.status === 'Running' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobAction(job.id, 'pause');
                      }}
                      className="p-2 hover:bg-slate-600 rounded-lg"
                    >
                      <Pause className="h-4 w-4 text-yellow-400" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobAction(job.id, 'start');
                      }}
                      className="p-2 hover:bg-slate-600 rounded-lg"
                    >
                      <Play className="h-4 w-4 text-green-400" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJobAction(job.id, 'retry');
                    }}
                    className="p-2 hover:bg-slate-600 rounded-lg"
                  >
                    <RotateCcw className="h-4 w-4 text-slate-400" />
                  </button>
                  {job.status === 'Failed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                        setShowJobDetails(true);
                      }}
                      className="p-2 hover:bg-slate-600 rounded-lg"
                    >
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {renderJobModal()}
      {renderJobDetails()}
    </div>
  );
}