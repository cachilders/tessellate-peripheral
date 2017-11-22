using System;
using System.Collections.Specialized;
using System.Text;
using System.Net.Http;
using System.Net.Http.Headers;
using Windows.ApplicationModel.Background;

// The Background Application template is documented at http://go.microsoft.com/fwlink/?LinkID=533884&clcid=0x409

namespace TessellatePeripheral
{
    public sealed class StartupTask : IBackgroundTask
    {
        public async void Run(IBackgroundTaskInstance taskInstance)
        {
            BackgroundTaskDeferral deferral = taskInstance.GetDeferral();

            var uri = new Uri("http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate");

            // string name = "00:00:11:00:00";
            // string message = "Dragonboard Windows IoT Prealpha";

            string payload = "{\"name\": \"00:00:00:00:00\", \"message\": \"Dragonboard Windows IoT Prealpha\"}";

            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, uri);
            request.Content = new StringContent(payload, Encoding.UTF8, "application/json");

            System.Diagnostics.Debug.WriteLine(request);

            var response = await client.SendAsync(request);

            System.Diagnostics.Debug.WriteLine(response);

            deferral.Complete();
        }
    }
}
