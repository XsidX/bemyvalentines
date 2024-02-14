"use client"
import { useChat, Message } from "ai/react"

export default function ChatComponent({ messages }: { messages: Message[] }) {
    // Vercel AI SDK (ai package) useChat()
    // useChat -> handles messages for us, user input, handling user submits, etc.
    // const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
    // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds]
    console.log(messages);

    const filteredMessages = messages.filter(message => message.role !== 'user');

    const latestMessage = filteredMessages[filteredMessages.length - 1];

    return (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10">
            {latestMessage && (
                <div key={latestMessage.id} className="bg-rose-200 px-6 py-3 animate-bounce">
                    {/*  Name of person talking */}
                    
                    {/* Formatting the message */}
                    {latestMessage.content.split("\n").map((currentTextBlock: string, index : number) => {
                        if(currentTextBlock === "") {
                            return <p className="text-rose-950 text-5xl font-bold" key={latestMessage.id + index}>&nbsp;</p>
                        } else {
                            return <p className="text-rose-950 text-5xl font-bold" key={latestMessage.id + index}>{currentTextBlock}</p>
                        }
                    })}
                </div>
            )}
        </div>
    )
}