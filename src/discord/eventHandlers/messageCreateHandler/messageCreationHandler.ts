import { SupabaseClient } from '@supabase/supabase-js'
import { Guild, Message } from 'discord.js'
import { Guilds } from '../../../database/types'
import { deleteChannelsHandler } from './commands/deleteChannelsHandler'
import { helpCommandHandler } from './commands/helpCommandHandler'
import { matchOnceHandler } from './commands/matchOnceHandler'
import { setBlacklistHandler } from './commands/setBlacklistHandler'
import { setRolesCommandHandler } from './commands/setRolesCommandHandler'
import { statusCommandHandler } from './commands/statusCommandHandler'

type MessageCreateHandlerArgs = {
    message: Message
    command: string
    botChannelCategory: string
    botMatchingChannelName: string
    guildData: Guilds
    args: string
    supabase: SupabaseClient
    guild: Guild
    botId: string
}

export async function messageCreateHandler({
    message,
    command,
    botChannelCategory,
    botMatchingChannelName,
    guildData,
    args,
    supabase,
    guild,
    botId,
}: MessageCreateHandlerArgs) {
    if (command === 'alive') {
        await message.channel.send('Alive')
    }

    if (command === 'help') {
        await helpCommandHandler({
            message,
            botChannelCategory,
        })
    }

    if (command === 'status') {
        await statusCommandHandler({
            message,
            guildData,
        })
    }

    if (command === 'setRoles') {
        await setRolesCommandHandler({
            args,
            guild,
            message,
            supabase,
        })
    }

    if (command === 'setBlacklist') {
        await setBlacklistHandler({
            args,
            guild,
            guildData,
            message,
            supabase,
        })
    }

    if (command === 'deleteChannels') {
        await deleteChannelsHandler({
            botMatchingChannelName,
            guild,
            message,
        })
    }

    if (command === 'matchOnce') {
        await matchOnceHandler({
            botChannelCategory,
            botId,
            botMatchingChannelName,
            guild,
            guildData,
            message,
            supabase,
        })
    }
}
