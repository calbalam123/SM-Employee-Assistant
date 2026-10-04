const conversations = new Map();
const MAX_MESSAGES = 10;
const TTL_MS = 30 * 60 * 1000;

function keyFor(userId, channelId) {
  return userId + ":" + channelId;
}

export function getHistory(userId, channelId) {
  const key = keyFor(userId, channelId);
  const item = conversations.get(key);
  if (!item || Date.now() - item.updatedAt > TTL_MS) {
    conversations.delete(key);
    return [];
  }
  return item.messages;
}

export function addMessage(userId, channelId, role, content) {
  const key = keyFor(userId, channelId);
  const messages = getHistory(userId, channelId);
  messages.push({ role, content });
  while (messages.length > MAX_MESSAGES) messages.shift();
  conversations.set(key, { messages, updatedAt: Date.now() });
}

export function clearHistory(userId, channelId) {
  conversations.delete(keyFor(userId, channelId));
}
