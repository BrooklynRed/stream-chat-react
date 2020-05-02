import React, { PureComponent } from 'react';
import { Avatar } from './Avatar';
import moment from 'moment';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import { withTranslationContext } from '../context';

/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 *
 * @example ./docs/ChannelPreviewLastMessage.md
 * @extends PureComponent
 */

class ChannelPreviewLastMessage extends PureComponent {
  static propTypes = {
    /** **Available from [chat context](https://getstream.github.io/stream-chat-react/#chat)** */
    channel: PropTypes.object.isRequired,
    /** Current selected channel object */
    activeChannel: PropTypes.object,
    /** Setter for selected channel */
    setActiveChannel: PropTypes.func.isRequired,
    /**
     * Object containing watcher parameters
     * @see See [Pagination documentation](https://getstream.io/chat/docs/#channel_pagination) for a list of available fields for sort.
     * */
    watchers: PropTypes.object,
    /** Number of unread messages */
    unread: PropTypes.number,
    /** If channel of component is active (selected) channel */
    active: PropTypes.bool,
    /** Latest message's text. */
    latestMessage: PropTypes.string,
    /** Length of latest message to truncate at */
    latestMessageLength: PropTypes.number,
    /** Title of channel to display */
    displayTitle: PropTypes.string,
    /** Image of channel to display */
    displayImage: PropTypes.string,
  };

  static defaultProps = {
    latestMessageLength: 20,
  };

  channelPreviewButton = React.createRef();

  onSelectChannel = () => {
    this.props.setActiveChannel(this.props.channel, this.props.watchers);
    this.channelPreviewButton.current.blur();
  };

  render() {
    const { t, displayTitle, displayImage, channel } = this.props;

    const unreadClass =
      this.props.unread >= 1 ? 'str-chat__channel-preview--unread' : '';
    const activeClass = this.props.active
      ? 'str-chat__channel-preview--active'
      : '';

    const isDm = channel.data.member_count === 2;
    const lastUpdatedAt = moment(channel.data.last_message_at);

    return (
      <div
        className={`str-chat__channel-preview ${unreadClass} ${activeClass} ${
          isDm
            ? 'str-chat__channel-preview--dm'
            : 'str-chat__channel-preview--group'
        }`}
      >
        <button onClick={this.onSelectChannel} ref={this.channelPreviewButton}>
          {this.props.unread >= 1 && (
            <div className="str-chat__channel-preview--dot" />
          )}
          <div className="str-chat--channel-summary">
            {isDm && <Avatar image={displayImage} />}

            <div className="str-chat__channel-preview-info">
              <span className="str-chat__channel-preview-title">
                {displayTitle}
              </span>
              <span className="str-chat__channel-preview-last-message">
                {!this.props.channel.state.messages[0]
                  ? t('Nothing yet...')
                  : truncate(this.props.latestMessage, {
                      length: this.props.latestMessageLength,
                    })}
              </span>
              {this.props.unread >= 1 && (
                <span className="str-chat__channel-preview-unread-count">
                  {this.props.unread}
                </span>
              )}
            </div>
          </div>

          {!isDm && (
            <div className="str-chat--channel-status">
              <span>{channel.data.member_count} members</span>
            </div>
          )}

          <div className="str-chat--channel-last-update">
            {moment().diff(lastUpdatedAt, 'days') > 0
              ? lastUpdatedAt.format('M/D/YY')
              : lastUpdatedAt.fromNow()}
          </div>
        </button>
      </div>
    );
  }
}

ChannelPreviewLastMessage = withTranslationContext(ChannelPreviewLastMessage);
export { ChannelPreviewLastMessage };
