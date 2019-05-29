using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ocmsProject.Startup))]
namespace ocmsProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
          
        }
    }
}
