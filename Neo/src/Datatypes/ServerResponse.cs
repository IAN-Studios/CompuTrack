using System.Diagnostics.CodeAnalysis;

namespace CompuTrack.DataTypes
{
	public class ServerResponse : DataType
	{
		public int code { get; set; }
		public string message { get; set; }
			[AllowNull]
			public string data { get; set; }

		public ServerResponse(int code, string message) {
			this.code = code;
			this.message = message;
		}
		public ServerResponse(int code, string message, string data)
		{
			this.data = data;
			this.code = code;
			this.message = message;
		}
		public static class Templates
		{
			public static ServerResponse OK = new ServerResponse(200, "OK");
			public static ServerResponse BADDATA = new ServerResponse(400, "BAD REQUEST");
			public static ServerResponse FU = new ServerResponse(602, "FUCK YOU");
			public static ServerResponse CREATED = new ServerResponse(201, "CREATED");
			public static ServerResponse ACCEPTED = new ServerResponse(202, "ACCEPTED");
			public static ServerResponse ERROR = new ServerResponse(500, "INTERNAL SERVER ERROR");
		}
	}
}
