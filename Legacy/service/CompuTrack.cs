using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.NetworkInformation;

namespace SRV_CompuTrack
{
	public partial class Service1 : ServiceBase
	{
		public System.Diagnostics.Process process;
		public System.Diagnostics.EventLog logger;
		public Service1()
		{
			InitializeComponent();

			// Set up Event Log
			if (!System.Diagnostics.EventLog.SourceExists("CTserver"))
			{
				System.Diagnostics.EventLog.CreateEventSource(
					"CTserver", "CompuTrack");
			}
			logger = new System.Diagnostics.EventLog("CompuTrack");
			logger.Source = "CTserver";
			logger.Log = "CompuTrack";


			// Log when Ipv4 Network Address is changed to event log, so that when the server address changes we can log it.
			NetworkChange.NetworkAddressChanged += new NetworkAddressChangedEventHandler((object sender, System.EventArgs e) => {
				string response = "";
				NetworkInterface[] adapters = NetworkInterface.GetAllNetworkInterfaces();
				foreach (NetworkInterface n in adapters)
				{
					response = response + "\n[{0} is {1}] [" + n.Name + "] [" + n.OperationalStatus + "]";
				}
				logger.WriteEntry("[WARN] Network Change Detected.\nChange Details:\n" + response, System.Diagnostics.EventLogEntryType.Warning);
			}); 
		}
		protected override void OnStart(string[] args)
		{
			logger.WriteEntry("Service Started.");
			logger.WriteEntry("Attempting to load Server Module");
			try
			{
				var server = new Process
				{
					StartInfo = new ProcessStartInfo
					{
						FileName = "cmd.exe",
						Arguments = "/c \"cd C:/projects/src/jcps/computrack/ && node server\"",
						UseShellExecute = false,
						RedirectStandardOutput = true,
						CreateNoWindow = true
			}
				};
				logger.WriteEntry("Server Module Loaded");
				logger.WriteEntry("Attempting start of server.....");
				try
				{
					server.Start();
					logger.WriteEntry("Server Started.", System.Diagnostics.EventLogEntryType.SuccessAudit);
					server.OutputDataReceived += new DataReceivedEventHandler((sender, e) =>
					{
						if (e.Data == null) return;
						if (e.Data.StartsWith("[DEBUG]")) logger.WriteEntry(e.Data, System.Diagnostics.EventLogEntryType.Information);
						else if (e.Data.StartsWith("[ERR]")) logger.WriteEntry(e.Data, System.Diagnostics.EventLogEntryType.Error);
						else if (e.Data.StartsWith("[WARN]")) logger.WriteEntry(e.Data, System.Diagnostics.EventLogEntryType.Warning);
						else logger.WriteEntry("[GENERIC]" + e.Data);
					});
					server.BeginOutputReadLine();
				} catch
				{
					logger.WriteEntry("Failed to start server", System.Diagnostics.EventLogEntryType.Error);

				}
			} catch
			{
				logger.WriteEntry("Could not start Application", System.Diagnostics.EventLogEntryType.Error);
			}

		}

		protected override void OnStop()
		{
		}
	}
}
