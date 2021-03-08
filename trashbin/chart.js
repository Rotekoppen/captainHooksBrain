const { Command } = require("discord.js-commando");
const { MessageAttachment } = require("discord.js");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

module.exports = class chartCommand extends Command {

	chartCallback = (ChartJs) => {
		ChartJs.plugins.register({
			beforeDraw: (chartInstance) => {
				const { chart } = chartInstance
				const { ctx } = chart
				ctx.fillStyle = "white"
				ctx.fillRect(0, 0, chart.width, chart.height)
			}
		})
	}

	canvas = new ChartJSNodeCanvas({ width: 640, height: 360, chartCallback: this.chartCallback})

	constructor(client) {
		super(client, {
			name: "chart",
			group: "other",
			memberName: "chart",
			description: "Plots json data given in a chart using chart.js. See https://www.chartjs.org/docs/latest/getting-started/usage.html for usage.",
			args: [
				{
					key: "rawdata",
					prompt: "Chart data in json format.",
					type: "string",
				},
			],
		});
	}

	run = async function(message, { rawdata }) {
		let data = []
		try {
      data = JSON.parse(rawdata)
    } catch (e) {
			return message.reply("Invalid json was given: " + e)
    }
		try {
			const image = await this.canvas.renderToBuffer(data,"image/png")
			const attachment = new MessageAttachment(image)
			return message.channel.send(attachment)
		} catch (e) {
			return message.reply("An error occured: " + e)
		}
	}
};
