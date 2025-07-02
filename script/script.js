 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9',
                        }
                    }
                }
            }
        }

 // Track typing state
        const typingStates = {
            sender: false,
            receiver: false
        };
        
        // Track typing timeouts
        const typingTimeouts = {
            sender: null,
            receiver: null
        };
        
        // Check if user is typing
        function checkTyping(user) {
            const otherUser = user === 'sender' ? 'receiver' : 'sender';
            
            if (!typingStates[user]) {
                typingStates[user] = true;
                // Show "User is typing" on the OTHER user's screen
                document.getElementById(`${user}-typing`).style.opacity = '1';
            }
            
            // Reset the typing timeout
            clearTimeout(typingTimeouts[user]);
            typingTimeouts[user] = setTimeout(() => {
                typingStates[user] = false;
                // Hide typing indicator on the OTHER user's screen
                document.getElementById(`${user}-typing`).style.opacity = '0';
            }, 2000);
        }
        
        // Send message function
        function sendMessage(user) {
            const inputElement = document.getElementById(`${user}-input`);
            const message = inputElement.value.trim();
            
            if (message === '') return;
            
            const otherUser = user === 'sender' ? 'receiver' : 'sender';
            
            // Add message to BOTH chat screens
            addMessageToChat(user, 'sender-chat', message, true);
            addMessageToChat(user, 'receiver-chat', message, false);
            
            // Clear input
            inputElement.value = '';
            
            // Clear typing indicator
            typingStates[user] = false;
            document.getElementById(`${user}-typing`).style.opacity = '0';
            clearTimeout(typingTimeouts[user]);
        }
        
        // Helper function to add message to a specific chat container
        function addMessageToChat(sender, chatContainerId, message, isOriginalSender) {
            const chatContainer = document.getElementById(chatContainerId);
            const isSender = (sender === 'sender' && chatContainerId === 'sender-chat') || 
                            (sender === 'receiver' && chatContainerId === 'receiver-chat');
            
            const messageElement = document.createElement('div');
            messageElement.className = `flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`;
            messageElement.innerHTML = `
                <div class="message ${isSender ? 'bg-purple-100 rounded-tr-none' : 'bg-gray-200 rounded-tl-none'} text-gray-800 p-3 rounded-lg">
                    ${message}
                </div>
            `;
            
            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        // Handle Enter key press
        document.getElementById('sender-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage('sender');
            }
        });
        
        document.getElementById('receiver-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage('receiver');
            }
        });