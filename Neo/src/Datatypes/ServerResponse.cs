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
		public ServerResponse(int code, string message, string data) : this(code, message)
		{
			this.data = data;
			this.code = code;
			this.message = message;
		}
	}
}
