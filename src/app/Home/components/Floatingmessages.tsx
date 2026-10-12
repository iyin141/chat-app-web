import { MessageCircle } from "lucide-react";


const FloatingAssets = () => {
  const messages = [
    { 
      user: "Sarah", 
      message: "Hey! How's everyone doing?", 
      time: "2m ago", 
      avatar: "S",
      position: "top-32 left-20"
    },
    { 
      user: "Mike", 
      message: "Just finished the project presentation! 🎉", 
      time: "5m ago", 
      avatar: "M",
      position: "top-40 right-20"
    },
    { 
      user: "Emma", 
      message: "Anyone up for coffee later?", 
      time: "12m ago", 
      avatar: "E",
      position: "bottom-80 left-16"
    },
    { 
      user: "Alex", 
      message: "The new Chat-box features are amazing!", 
      time: "18m ago", 
      avatar: "A",
      position: "bottom-96 right-16"
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none floating-messages">
      {messages.map((message, index) => (
        <div
          key={message.user}
          className={`absolute ${message.position} message-bubble ${
            index % 3 === 0 ? 'float-animation' : 
            index % 3 === 1 ? 'float-animation float-delayed' : 
            'float-animation float-delayed-2'
          }`}
        >
          <div className="flex items-start space-x-3 max-w-[280px]">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-foreground">
                {message.avatar}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-semibold text-card-foreground">
                  {message.user}
                </span>
                <span className="text-xs text-muted-foreground">
                  {message.time}
                </span>
              </div>
              <div className="text-sm text-card-foreground leading-relaxed">
                {message.message}
              </div>
            </div>
            <MessageCircle className="w-4 h-4 text-muted-foreground mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingAssets;
