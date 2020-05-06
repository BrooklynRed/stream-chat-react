import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from './Avatar';
import {
  withChatContext,
  withChannelContext,
  withTranslationContext,
} from '../context';

/**
 * ChannelHeader - Render some basic information about this channel
 *
 * @example ./docs/ChannelHeader.md
 * @extends PureComponent
 */
class ChannelHeader extends PureComponent {
  static propTypes = {
    /** Set title manually */
    title: PropTypes.string,
    /** Show a little indicator that the channel is live right now */
    live: PropTypes.bool,
    /** **Available from [channel context](https://getstream.github.io/stream-chat-react/#chat)** */
    channel: PropTypes.object.isRequired,
    /** **Available from [channel context](https://getstream.github.io/stream-chat-react/#chat)** */
    watcher_count: PropTypes.number,
  };

  render() {
    const {
      t,
      channel,
      title,
      live,
      watcher_count,
      MemberList = ({ children }) => <>{children}</>,
    } = this.props;

    return (
      <div className="str-chat__header-livestream">
        <div
          className="str-chat__header-hamburger"
          onClick={this.props.openMobileNav}
        >
          <span className="str-chat__header-hamburger--line"></span>
          <span className="str-chat__header-hamburger--line"></span>
          <span className="str-chat__header-hamburger--line"></span>
        </div>
        {channel.data.image && (
          <Avatar
            image={channel.data.image}
            shape="rounded"
            size={channel.type === 'commerce' ? 60 : 40}
          />
        )}
        <div className="str-chat__header-livestream-left">
          <p className="str-chat__header-livestream-left--title">
            {title || channel.data.name}{' '}
            {live && (
              <span className="str-chat__header-livestream-left--livelabel">
                {t('live')}
              </span>
            )}
          </p>
          {channel.data.subtitle && (
            <p className="str-chat__header-livestream-left--subtitle">
              {channel.data.subtitle}
            </p>
          )}
          <p className="str-chat__header-livestream-left--members">
            <MemberList>
              {!live && channel.data.member_count > 0 && (
                <>
                  {t('{{ memberCount }} members', {
                    memberCount: channel.data.member_count,
                  })}
                  ,{' '}
                </>
              )}
              {t('{{ watcherCount }} online', { watcherCount: watcher_count })}
            </MemberList>
          </p>
        </div>
      </div>
    );
  }
}

ChannelHeader = withChatContext(ChannelHeader);
ChannelHeader = withChannelContext(withTranslationContext(ChannelHeader));
export { ChannelHeader };
