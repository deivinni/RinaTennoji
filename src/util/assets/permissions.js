module.exports = {
  CREATE_INSTANT_INVITE: {
    desc: 'Permite a criação de convites instantâneos.',
    code: '0x00000001',
    name: 'Criar convites'
  },
  KICK_MEMBERS: {
    desc: 'Permite expulsar membros.',
    code: '0x00000002',
    name: 'Expulsar membros'
  },
  BAN_MEMBERS: {
    desc: 'Permite banir membros.',
    code: '0x00000004',
    name: 'Banir membros'
  },
  ADMINISTRATOR: {
    desc: 'Permite todas as permissões e ignora as substituições de permissão do canal.',
    code: '0x00000008',
    name: 'Administrador'
  },
  MANAGE_CHANNELS: {
    desc: 'Permite gerenciamento e edição de canais.',
    code: '0x00000010',
    name: 'Gerenciar canais'
  },
  MANAGE_GUILD: {
    desc: 'Permite gerenciamento e edição da guilda.',
    code: '0x00000020',
    name: 'Gerenciar Sservidor'
  },
  ADD_REACTIONS: {
    desc: 'Permite adicionar reações às mensagens.',
    code: '0x00000040',
    name: 'Adicionar reações'
  },
  VIEW_AUDIT_LOG: {
    desc: 'Permite a visualização de logs de auditoria.',
    code: '0x00000080',
    name: 'Ver o registro de auditoria'
  },
  VIEW_CHANNEL: {
    desc: 'Permite que os membros da guilda visualizem um canal, que inclui a leitura de mensagens em canais de texto.',
    code: '0x00000400',
    name: 'Ler canais de texto e ver canais de voz'
  },
  SEND_MESSAGES: {
    desc: 'Permite enviar mensagens em um canal.',
    code: '0x00000800',
    name: 'Enviar mensagens'
  },
  SEND_TTS_MESSAGES: {
    desc: 'Permite o envio de mensagens `/tts`.',
    code: '0x00001000',
    name: 'Enviar mensagens em TTS'
  },
  MANAGE_MESSAGES: {
    desc: 'Permite excluir mensagens de outros usuários.',
    code: '0x00002000',
    name: 'Gerenciar mensagens'
  },
  EMBED_LINKS: {
    desc: 'Os links enviados pelos usuários com essa permissão serão incorporados automaticamente.',
    code: '0x00004000',
    name: 'Inserir links'
  },
  ATTACH_FILES: {
    desc: 'Permite o upload de imagens e arquivos.',
    code: '0x00008000',
    name: 'Anexar arquivos'
  },
  READ_MESSAGE_HISTORY: {
    desc: 'Permite a leitura do histórico de mensagens.',
    code: '0x00010000',
    name: 'Ver histórico de mensagens'
  },
  MENTION_EVERYONE: {
    desc: 'Permite usar a tag `@everyone` para notificar todos os usuários em um canal e a tag `@here` para notificar todos os usuários on-line em um canal.',
    code: '0x00020000',
    name: 'Mencionar todos'
  },
  USE_EXTERNAL_EMOJIS: {
    desc: 'Permite o uso de emojis personalizados de outros servidores.',
    code: '0x00040000',
    name: 'Usar emojis externos'
  },
  CONNECT: {
    desc: 'Permite ingressar em um canal de voz.',
    code: '0x00100000',
    name: 'Conectar'
  },
  SPEAK: {
    desc: 'Permite falar em um canal de voz.',
    code: '0x00200000',
    name: 'Falar'
  },
  MUTE_MEMBERS: {
    desc: 'Permite silenciar membros em um canal de voz.',
    code: '0x00400000',
    name: 'Silenciar membros'
  },
  DEAFEN_MEMBERS: {
    desc: 'Permite ensurdecer os membros em um canal de voz.',
    code: '0x00800000',
    name: 'Ensurdecer membros'
  },
  MOVE_MEMBERS: {
    desc: 'Permite mover membros entre canais de voz.',
    code: '0x01000000',
    name: 'Mover membros'
  },
  USE_VAD: {
    desc: 'Permite usar a detecção de voz em um canal de voz.',
    code: '0x02000000',
    name: 'Usar detecção de voz'
  },
  PRIORITY_SPEAKER: {
    desc: 'Permite o uso de voz prioritária em um canal de voz.',
    code: '0x00000100',
    name: 'Voz Prioritária'
  },
  STREAM: {
    desc: 'Permite que o usuário comece uma transmissão.',
    code: '0x00000200',
    name: 'Ao Vivo'
  },
  CHANGE_NICKNAME: {
    desc: 'Permite a modificação do próprio apelido.',
    code: '0x04000000',
    name: 'Alterar apelido'
  },
  MANAGE_NICKNAMES: {
    desc: 'Permite a modificação de apelidos de outros usuários.',
    code: '0x08000000',
    name: 'Gerenciar apelidos'
  },
  MANAGE_ROLES: {
    desc: 'Permite o gerenciamento e edição de cargos',
    code: '0x10000000',
    name: 'Gerenciar cargos'
  },
  MANAGE_WEBHOOKS: {
    desc: 'Permite o gerenciamento e edição de webhooks',
    code: '0x20000000',
    name: 'Gerenciar webhooks'
  },
  MANAGE_EMOJIS: {
    desc: 'Permite o gerenciamento e edição de emojis',
    code: '0x40000000',
    name: 'Gerenciar emojis'
  }
}