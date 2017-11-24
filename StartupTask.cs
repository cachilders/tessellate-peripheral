using System;
using System.Linq;
using System.Text;
using System.Net.Http;
using Windows.ApplicationModel.Background;
using Windows.System.Threading;

// The Background Application template is documented at http://go.microsoft.com/fwlink/?LinkID=533884&clcid=0x409

namespace TessellatePeripheral
{
    public sealed class StartupTask : IBackgroundTask
    {
        BackgroundTaskDeferral _deferral;

        public ThreadPoolTimer timer { get; private set; }

        public async void Run(IBackgroundTaskInstance taskInstance)
        {
            _deferral = taskInstance.GetDeferral();

            var uri = new Uri("http://tessellate.cc/io/tessellate");

            string name = string.Empty; // TODO: Need to rectify the below commented problem and generate this data.
            string message = "Dragonboard Windows IoT Prealpha";

            // Apparently this machinery is disabled in Win IOT. The alternative pinging localhost:8080/api/networking/ipconfig
            // seems prohibitively cumbersome at the moment.

            // NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
            // foreach(NetworkInterface adapter in nics)
            // {
            //     if (name == string.Empty)
            //     {
            //         IPInterfaceProperties properties = adapter.GetIPProperties();
            //         name = adapter.GetPhysicalAddress().ToString();
            //     }
            // };

            string payload = $"{{\"name\": \"{name}\", \"message\": \"{message}\"}}";

            this.timer = ThreadPoolTimer.CreatePeriodicTimer(Post_Data, TimeSpan.FromSeconds(60));

            async void Post_Data(ThreadPoolTimer timer)
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, uri);
                request.Content = new StringContent(payload, Encoding.UTF8, "application/json");
                System.Diagnostics.Debug.WriteLine(request);
                var response = await client.SendAsync(request);
                System.Diagnostics.Debug.WriteLine(response);
            }
        }
    }
}
