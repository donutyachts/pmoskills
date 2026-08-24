*Analytics*
I swtiched from Vercel to Cloudflare Pages for this site exclusively because Cloudflare provide AI agent analytics. And for free while many of the well establish analytics tools either don't provide AI agent analytics or charge a fortune for it. 

The idea of ai agents using websites as 'resources' stuck with me after watching Jeff Sp YouTube video. In the video he explains Cloudflare is create the framework where agents can consume websites as 'resources' AND pay for the resources they use. This parallel and backend access to websites is completely new and I watched it first hand when setting up a Stripe account to collect tips. There were soooo many settings in Stripe that I used the Stripe MCP in Cursor and created the payment link exclusivley using Stripe's MCP with the exception of accepting the T&Cs which I had to manually accept in a browser. I watchd the video the day before and the following day created the payment link via MCP. And because of I began searching analytics that shows me agent queries to may site. I learned, after asking Claude to do research, that most analytics tools uses JavaScript to track and since agents mainly don't use a browser to access sites, their access isn't tracked unless an agent accesses the site via browser although that's not the default.

While I clicked around in Strip I saw an agent payments section. And that cemented the idea even more. 

And now I'm on to learning to use Cloudflare Workers and Pages.

I should say that I'm also using Micrsoft clarity on this site because it provides session recordings as well as heat maps. For FREE! 